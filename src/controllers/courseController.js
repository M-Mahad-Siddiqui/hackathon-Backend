// import Course from "../models/Course.model.js";
// export const addCourse = async (req, res) => {
//     const { semester, department, batch,  courses, labs,year } = req.body;
//     if (!semester || !department || !batch  || !courses || !labs) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }
//     try {
//         // Check if course already exists
//         const existingCourse = await Course.findOne({ semester, department, batch });
//         if (existingCourse) {
//             return res.status(400).json({ error: 'Course already exists' });
//         }
//         // Create new course
//         const course = new Course({ semester, department,year, batch, courses, labs });
//         await course.save();
//         return res.json({ success: true, msg: "Course added successfully" });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ msg: "Error in adding course" });
//     }

// }

// export const getCourse = async (req, res) => {
//     const { semester, department, batch } = req.query;
//     if (!semester || !department || !batch ) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }
//     console.log(semester, department, batch);
//     try {
//         const course = await Course.findOne({ semester, department, batch });
//         if (!course) {
//             return res.status(404).json({ error: 'Course not found' });
//         }
//         return res.json({ success: true, course });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ msg: "Error in getting course" });
//     }
// }

// export const updateCourse = async (req, res) => {
//     const { semester, department, batch, courses, labs } = req.body;
//     if (!semester || !department || !batch || !courses || !labs) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }
//     try {
//         const course = await Course.findOneAndUpdate({ semester, department, batch }, { courses, labs }, { new: true });
//         if (!course) {
//             return res.status(404).json({ error: 'Course not found' });
//         }
//         return res.json({ success: true, course });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ msg: "Error in updating course" });
//     }
// }

// export const deleteCourse = async (req, res) => {
//     const { semester, department, batch } = req.body;
//     if (!semester || !department || !batch ) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }
//     try {
//         const course = await Course.findOneAndDelete({ semester, department, batch });
//         if (!course) {
//             return res.status(404).json({ error: 'Course not found' });
//         }
//         return res.json({ success: true, course });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ msg: "Error in deleting course" });
//     }
// }
