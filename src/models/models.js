import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  descriptionButtons: [
    {
      title: String,
      link: String,
    },
  ],
});

const semesterSchema = new mongoose.Schema({
  name: String,
  subjects: [subjectSchema],
});

const branchSchema = new mongoose.Schema({
  title: String,
  semesters: [semesterSchema],
});

const collegeSchema = new mongoose.Schema({
  name: String,
  branches: [branchSchema],
});

export const Subject = mongoose.models.Subject || mongoose.model('Subject', subjectSchema);
export const Semester = mongoose.models.Semester || mongoose.model('Semester', semesterSchema);
export const Branch = mongoose.models.Branch || mongoose.model('Branch', branchSchema);
export const College = mongoose.models.College || mongoose.model('College', collegeSchema);