import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import fs from 'fs'; // Corrected import for fs
import StudentDetail from "../models/Students.model.js";
import userModel from "../models/userModel.js";
import { storage } from "../utils/firebase.js";

export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body; // we pass userId in the body through userAuth middleware

        // Find user by ID and populate the studentDetail field
        const user = await userModel.findById(userId).populate('studentDetail');

        if (!user) {
            // Return immediately after sending the response for "User not found"
            return res.status(404).json({ message: "User not found" });
        }

        // Return populated data if the user is found
        return res.status(200).json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                _id: user._id,
                studentDetail: user.studentDetail // This will now include the populated data
            }
        });

    } catch (error) {
        // Send the error response and return to stop further execution
        return res.status(500).json({ message: error.message });
    }
};




// export const addUserDetails = async (req, res) => {
//     try {
//         const {
//             userId,
//             image,
//             batch,
//             workExperience,
//             department,
//             homePhone,
//             section,
//             email,
//             fatherName,
//             motherName,
//             gender,
//             dob,
//             cnic,
//             isSingle,
//             phone,
//             address,
//             bloodGroup,
//             gmail
//         } = req.body;

//         console.log("Request body:", req.body);

//         // Step 1: Find the user by userId
//         const user = await userModel.findById(userId).populate('studentDetail');
//         if (!user) {
//             return res.status(404).json({ success: false, msg: "User not found" });
//         }

//         // Prepare student data
//         const studentData = {
//             image,
//             batch,
//             workExperience,
//             department,
//             homePhone,
//             section,
//             email,
//             fatherName,
//             motherName,
//             gender,
//             dob,
//             cnic,
//             isSingle,
//             phone,
//             address,
//             bloodGroup,
//             gmail
//         };

//         console.log("Student data received:", studentData);

//         if (user.studentDetail) {
//             // Step 2a: Update existing studentDetail
//             const updatedStudentDetail = await StudentDetail.findByIdAndUpdate(
//                 user.studentDetail._id,
//                 { $set: studentData },
//                 { new: true }
//             );

//             console.log("Student details updated:", updatedStudentDetail);

//             return res.json({
//                 success: true,
//                 msg: "Student details updated successfully",
//                 studentDetail: updatedStudentDetail,
//             });
//         } else {
//             // Step 2b: Create new studentDetail if not already linked
//             const newStudentDetail = await StudentDetail.create(studentData);

//             // Link the new studentDetail to the user
//             user.studentDetail = newStudentDetail._id;
//             await user.save();

//             console.log("New student details created:", newStudentDetail);

//             return res.json({
//                 success: true,
//                 msg: "Student details added successfully",
//                 studentDetail: newStudentDetail,
//             });
//         }

//     } catch (error) {
//         console.error("Error in addUserDetails:", error);
//         return res.status(500).json({
//             success: false,
//             msg: "Error in processing student details",
//             error: error.message,
//         });
//     }
// };





export const addUserDetails = async (req, res) => {
    try {
        const {
            // userId,
            batch,
            workExperience,
            department,
            homePhone,
            section,
            email,
            fatherName,
            motherName,
            gender,
            dob,
            cnic,
            isSingle,
            phone,
            address,
            bloodGroup,
            gmail
        } = req.body;

        console.log("Request body:", req.body);
        console.log("phone", phone);
        const userId = req.userId;

        // Step 1: Find the user by userId
        const user = await userModel.findById(userId).populate('studentDetail');
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        // Prepare student data
        const studentData = {
            batch,
            workExperience,
            department,
            homePhone,
            section,
            email,
            fatherName,
            motherName,
            gender,
            dob,
            cnic,
            isSingle,
            phone,
            address,
            bloodGroup,
            gmail,
            image: []
        };
        if (req.file) {
            const { originalname, path: filePath, mimetype } = req.file;
            studentData.filename = originalname;
            studentData.path = filePath;
            studentData.mimetype = mimetype;

            // Reading the file as a buffer
            const fileBuffer = fs.readFileSync(filePath);  // Read the file content into a buffer

            // Correctly using the original file name in Firebase storage
            const storageRef = ref(storage, `QOBE_Images/${originalname}`);
            const snapshot = await uploadBytes(storageRef, fileBuffer);  // Pass the buffer

            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);

            // Ensure that we're pushing the new image URL into the existing image array
            studentData.image.push(downloadURL);  // Push the new image URL to the array
        }

        console.log("Student data received:", studentData);

        if (user.studentDetail) {
            // Step 2a: Update existing studentDetail
            // First update the non-image fields with $set
             await StudentDetail.findByIdAndUpdate(
                user.studentDetail._id,
                {
                    $set: studentData // Set the other student data fields, excluding the 'image' field
                }
            );

            // Then, update the 'image' field with $push   // image is array index zero update every time not add new one
            const updatedStudentDetail = await StudentDetail.findByIdAndUpdate(
                user.studentDetail._id,
                {
                    $push: { image: { $each: studentData.image } } // Push new images to the 'image' array
                },
                { new: true } // Return the updated document
            );


            return res.json({
                success: true,
                msg: "Student details updated successfully",
                studentDetail: updatedStudentDetail,
            });
        } else {
            // Step 2b: Create new studentDetail if not already linked
            const newStudentDetail = await StudentDetail.create(studentData);

            // Link the new studentDetail to the user
            user.studentDetail = newStudentDetail._id;
            await user.save();

            console.log("New student details created:", newStudentDetail);

            return res.json({
                success: true,
                msg: "Student details added successfully",
                studentDetail: newStudentDetail,
            });
        }

    } catch (error) {
        console.error("Error in addUserDetails:", error);
        return res.status(500).json({
            success: false,
            msg: "Error in processing student details",
            error: error.message,
        });
    }
};
//         const {
//             batch,
//             workExperience,
//             department,
//             homePhone,
//             section,
//             email,
//             fatherName,
//             motherName,
//             gender,
//             dob,
//             cnic,
//             isSingle,
//             phone,
//             address,
//             bloodGroup,
//             gmail
//         } = req.body;

//         console.log("Request body:", req.body);
//         console.log("phone", phone);
//         const userId = req.userId;

//         // Step 1: Find the user by userId
//         const user = await userModel.findById(userId).populate('studentDetail');
//         if (!user) {
//             return res.status(404).json({ success: false, msg: "User not found" });
//         }

//         // Prepare student data
//         const studentData = {
//             batch,
//             workExperience,
//             department,
//             homePhone,
//             section,
//             email,
//             fatherName,
//             motherName,
//             gender,
//             dob,
//             cnic,
//             isSingle,
//             phone,
//             address,
//             bloodGroup,
//             gmail,
//             image: [] // Ensure image is initialized as an empty array
//         };

//         if (req.file) {
//             // File upload on multer local storage 
//             const { originalname, path: filePath, mimetype } = req.file;
//             studentData.filename = originalname;
//             studentData.path = filePath;
//             studentData.mimetype = mimetype;

//             // Reading the file as a buffer
//             const fileBuffer = fs.readFileSync(filePath);  // Read the file content into a buffer

//             // Correctly using the original file name in Firebase storage
//             const storageRef = ref(storage, `images/${originalname}`);
//             const snapshot = await uploadBytes(storageRef, fileBuffer);  // Pass the buffer

//             // Get the download URL
//             const downloadURL = await getDownloadURL(storageRef);

//             // Ensure that we're pushing the new image URL into the existing image array
//             studentData.image.push(downloadURL);  // Push the new image URL to the array
//         }

//         console.log("Student data received:", studentData);

//         if (user.studentDetail) {
//             // Step 2a: Update existing studentDetail
//             const updatedStudentDetail = await StudentDetail.findByIdAndUpdate(
//                 user.studentDetail._id,
//                 { $push: { image: { $each: studentData.image } } }, // Use $push to append the new image URL
//                 { new: true }
//             );

//             console.log("Student details updated:", updatedStudentDetail);

//             return res.json({
//                 success: true,
//                 msg: "Student details updated successfully",
//                 studentDetail: updatedStudentDetail,
//             });
//         } else {
//             // Step 2b: Create new studentDetail if not already linked
//             const newStudentDetail = await StudentDetail.create(studentData);

//             // Link the new studentDetail to the user
//             user.studentDetail = newStudentDetail._id;
//             await user.save();

//             console.log("New student details created:", newStudentDetail);

//             return res.json({
//                 success: true,
//                 msg: "Student details added successfully",
//                 studentDetail: newStudentDetail,
//             });
//         }

//     } catch (error) {
//         console.error("Error in addUserDetails:", error);
//         return res.status(500).json({
//             success: false,
//             msg: "Error in processing student details",
//             error: error.message,
//         });
//     }
// };