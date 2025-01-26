import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
	{
		semester: {
			type: String,
			required: true,
			enum: ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight"],
		},
		// department: {
		//     type: mongoose.Schema.Types.ObjectId,
		//     ref: "Department",
		//     required: true,
		// },
		department: {
			type: String,
			required: true,
			enum: ["BSCS", "BSAI", "BSDS", "AR", "BSCY"],
		},
		batch: {
			type: String,
			required: true,
			enum: ["18", "19", "20", "22", "23", "24", "25", "26", "27"],
		},
		year: {
			type: String,
			enum: ["firstYear", "secondYear", "thirdYear", "fourthYear"],
		},
		courses: [
			{
				courseCode: {
					type: String,
					required: true,
				},
				courseName: {
					type: String,
					required: true,
				},
				courseCredit: {
					type: Number,
					min: 0,
				},
				courseType: {
					type: String,
					enum: ["major", "minor", "elective", "compulsory"],
				},
				courseStatus: {
					type: String,
					enum: ["active", "inactive"],
				},
				courseDescription: {
					type: String,
				},
				courseAssignments: [
					{
						type: mongoose.Schema.Types.ObjectId,
						ref: "Assignment",
					},
				],
				courseTeacher: {
					type: String,
					required: true,
				},
				// courseTeacher: {
				//     type: mongoose.Schema.Types.ObjectId,
				//     ref: "teacher",
				//     required: true,
				// },
				
			},
		],
		labs: [
			{
				labCode: {
					type: String,
					required: true,
				},
				labName: {
					type: String,
					required: true,
				},
				labCredit: {
					type: Number,
					min: 0,
				},
				labTeacher: {
					type: String,
					required: true,
				},
				// labTeacher: {
				//     type: mongoose.Schema.Types.ObjectId,
				//     ref: "teacher",
				//     required: true,
				// },
			},
		],
	},
	{ timestamps: true }
);

CourseSchema.index({ semester: 1, department: 1, batch: 1 });

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);


/*
{
  "semester": "first",
  "department": "BSCS",
  "batch": "18",
  "year": "firstYear",
  "courses": [
    {
      "courseCode": "CS101",
      "courseName": "Introduction to Computer Science",
      "courseCredit": 3,
      "courseType": "compulsory",
      "courseStatus": "active",
      "courseDescription": "An introductory course to computer science concepts.",
      "courseTeacher": "Dr. John Doe",
      "courseAssignments": []
    },
    {
      "courseCode": "CS102",
      "courseName": "Discrete Mathematics",
      "courseCredit": 4,
      "courseType": "major",
      "courseStatus": "active",
      "courseDescription": "Learn about logic, sets, and combinatorics.",
      "courseTeacher": "Prof. Jane Smith",
      "courseAssignments": []
    }
  ],
  "labs": [
    {
      "labCode": "CS101L",
      "labName": "Intro to CS Lab",
      "labCredit": 1,
      "labTeacher": "Dr. John Doe"
    },
    {
      "labCode": "CS102L",
      "labName": "Discrete Math Lab",
      "labCredit": 1,
      "labTeacher": "Prof. Jane Smith"
    }
  ]
}

*/