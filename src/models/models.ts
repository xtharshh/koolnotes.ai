import mongoose, { Schema, model, Document } from 'mongoose';

interface IBranch {
  name: string;
  semesters: ISemester[];
}

interface ISemester {
  subjects: ISubject[];
}

interface ISubject {
  name: string;
  description?: string;
  descriptionButtons?: IDescriptionButton[];
}

interface IDescriptionButton {
  link?: string;
  title?: string;
}

interface ICollege extends Document {
  name: string;
  branches: IBranch[];
}

const CollegeSchema = new Schema<ICollege>({
  name: { type: String, required: true },
  branches: [
    {
      name: { type: String, required: true },
      semesters: [
        {
          subjects: [
            {
              name: { type: String, required: true },
              description: String,
              descriptionButtons: [
                {
                  link: String,
                  title: String,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

const College = mongoose.models.College || model<ICollege>('College', CollegeSchema);

export { College };
export type { ICollege };
