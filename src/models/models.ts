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

interface IUpload extends Document {
  title: string;
  description: string;
  subject: string;
  fileUrl: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  paymentStatus: 'PENDING' | 'PAID';
  userId: mongoose.Types.ObjectId;
  price: number;
  createdAt: Date;
}

interface IUser extends Document {
  balance: number;
  email: string;
  name: string;
  stripeId?: string;
  uploads: IUpload[];
  earnings: number;
  role: 'USER' | 'ADMIN';
}

const UploadSchema = new Schema<IUpload>({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true
  },
  subject: { 
    type: String, 
    required: [true, 'Subject is required'],
    trim: true
  },
  fileUrl: { 
    type: String, 
    required: [true, 'File URL is required'],
    trim: true
  },
  status: { 
    type: String, 
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
  },
  paymentStatus: { 
    type: String, 
    enum: ['PENDING', 'PAID'],
    default: 'PENDING'
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required']
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Add indexes for better query performance
UploadSchema.index({ userId: 1, status: 1 });
UploadSchema.index({ createdAt: -1 });

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  stripeId: String,
  uploads: [{ type: Schema.Types.ObjectId, ref: 'Upload' }],
  earnings: { type: Number, default: 0 },
  role: { type: String, default: 'USER' },
  balance: { type: Number, default: 0 }
});

const College = mongoose.models.College || model<ICollege>('College', CollegeSchema);
const Upload = mongoose.models.Upload || model<IUpload>('Upload', UploadSchema);
const User = mongoose.models.User || model<IUser>('User', UserSchema);

export { Upload, User, College };
export type { IUpload, IUser, ICollege };
