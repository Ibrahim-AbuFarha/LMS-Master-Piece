import { Typography } from 'antd';
import ClassCard from './ClassCard';
import ClassList from './ClassList';

const MyClassesPage = () => {
  return (
    <div>
      <Typography.Title>My Classes</Typography.Title>
      
      <ClassList />
    </div>
  );
};

export default MyClassesPage;
