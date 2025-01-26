// import multer from "multer";
// import path from "path";
// import StudentDetail from "../models/Students.model.js";
// import userModel from "../models/userModel.js";


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(null, "uploads/"));
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//     },
// });

// const upload = multer({ storage: storage });


// export const uploadFile = async (req, res) => {
//     try {
//         const { userId } = req.body;

//         if (!userId) return res.status(400).json({ message: "User ID is required" });

//         const file = req.file;
//         if (!file) return res.status(400).json({ message: "File is required" });

//         const user = await userModel.findById(userId);
//         if (!user) return res.status(404).json({ message: "User not found" });
        
//         const image = { path: req.file.path, filename: req.file.filename };
//         await StudentDetail.push(image);
//         user.image = image;
//         await user.save();
//         return res.status(200).json({ message: "File uploaded successfully" });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Error in uploading file" });
//     }
// }

// // Fetch User Images
// export const fetchImages = async ('/image', async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const user = await userModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ images: user.images });
//     } catch (error) {
//         console.error('Fetch Images Error:', error);
//         res.status(500).json({ message: 'Error fetching images' });
//     }
// });

// export const fetchLastImage = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const user = await userModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const lastImage = user.images[user.images.length - 1];
//         res.status(200).json({ lastImage });
//     } catch (error) {
//         console.error('Fetch Last Image Error:', error);
//         res.status(500).json({ message: 'Error fetching last image' });
//     }
// };




import userModel from "../models/userModel.js";



export const uploadFile = async (req, res) => {
    try {
        const { email } = req.query;
        console.log("ulpoad file controller email",email);

        if (!email) return res.status(400).json({ message: "User ID is required" });

        const file = req.file;
        if (!file) return res.status(400).json({ message: "File is required" });

        const user = await userModel.findById(email);
        if (!user) return res.status(404).json({ message: "User not found" });

        const image = { path: req.file.path, filename: req.file.filename };
        user.images = user.images || []; // Ensure images is an array
        user.images.push(image);
        await user.save();

        res.status(200).json({ message: "File uploaded successfully", image });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in uploading file" });
    }
};

export const fetchImages = async (req, res) => {
    try {
        const userId = req.body.userId; // `userId` set by middleware
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ images: user.images || [] });
    } catch (error) {
        console.error("Fetch Images Error:", error);
        res.status(500).json({ message: "Error fetching images" });
    }
};

export const fetchLastImage = async (req, res) => {
    try {
        const userId = req.body.userId; // `userId` set by middleware
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const lastImage = user.images && user.images.length > 0
            ? user.images[user.images.length - 1]
            : null;
        res.status(200).json({ lastImage });
    } catch (error) {
        console.error("Fetch Last Image Error:", error);
        res.status(500).json({ message: "Error fetching last image" });
    }
};
