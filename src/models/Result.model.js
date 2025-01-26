import mongoose from "mongoose";
const resultSchema = new mongoose.Schema({
	batch: {
		type: String,
		enum: ["18", "19", "20", "21", "22", "23", "24", "25", "26", "27"],
		default: null,
	},
	year: {
		type: String,
		enum: ["firstYear", "secondYear", "thirdYear", "fourthYear"],
		default: null,
	},
	department: {
		type: String,
		enum: ["BSCS", "BSAI", "BSDS", "AR", "BSCY"],
		default: null,
	},
	semester: {
		type: String,
		enum: ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight"],
		required: true,
	},
	date_of_issues: { type: String, },
	semesterResults: [
		{
			email: {
				type: String,
			},
			gpa: {
				type: Number,
				default: 0,
				min: 0,
				max: 4.0,
			},
		},
	],
});

const resultModel = mongoose.models.result || mongoose.model("result", resultSchema);

export default resultModel;



//----------------------------------------------------------------------------------------- mock data the accepts
// {
// 	"batch": "22",
// 		"year": "firstYear",
// 			"department": "BSCS",
// 				"semester": "first",
// 					"semesterResults": [
// 						{
// 							"email": "22F-BSCS-2@gmail.com",
// 							"gpa": 3.5,
// 							"semester": "first"
// 						},
// 						{
// 							"email": "22F-BSCS-2@gmail.com",
// 							"gpa": 3.7,
// 							"semester": "first"
// 						},
// 						{
// 							"email": "22F-BSCS-3@gmail.com",
// 							"gpa": 3.8,
// 							"semester": "first"
// 						}
// 					]
// }






















// export default resultModel;

// import { Student } from './models/Student'; // Import the Student model
// import BatchResult from './models/BatchResult'; // Import the BatchResult model

// const updateStudentResults = async (batchResultId) => {
//   // Fetch the batch result from the database using the ID
//   const batchResult = await BatchResult.findById(batchResultId);

//   if (!batchResult) {
//     throw new Error('Batch result not found');
//   }

//   const { batch, year, department, semester, results } = batchResult;

//   // Iterate over the results and update the corresponding students
//   for (let result of results) {
//     const { uni_id, gpa } = result;

//     // Find the student by uni_id
//     const student = await Student.findOne({ uni_id });

//     if (student) {
//       // Add the new result to the student's result array
//       const newResult = {
//         semester,
//         gpa
//       };

//       // If the student is found, update their result for this semester
//       student.result.push(newResult);

//       // Save the updated student record
//       await student.save();
//     } else {
//       console.log(`Student with uni_id ${uni_id} not found`);
//     }
//   }

//   console.log(`Results updated for batch ${batch}, department ${department}, semester ${semester}`);
// };

// export { updateStudentResults };
