import app from './app';
import connectDB from './mongo';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
