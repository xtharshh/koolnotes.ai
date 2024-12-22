
import mongoose from 'mongoose';

const { connect, Schema, model, connection } = mongoose;

const MONGO_URI = 'mongodb+srv://xtharshh2:Guddu-0987@cluster0.na8x5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const collegeSchema = new Schema({
  name: String,
  branches: [
    {
      title: String,
      semesters: [
        {
          name: String,
          subjects: [
            {
              name: String,
              description: String,
              descriptionButtons: [
                {
                  title: String,
                  link: String
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});

const College = model('College', collegeSchema);

async function checkData() {
  try {
    const colleges = await College.find().populate({
      path: 'branches',
      populate: {
        path: 'semesters',
        populate: {
          path: 'subjects'
        }
      }
    });
    console.log('Colleges:', colleges);
  } catch (error) {
    console.error('Error fetching colleges:', error);
  } finally {
    connection.close();
  }
}

checkData();
