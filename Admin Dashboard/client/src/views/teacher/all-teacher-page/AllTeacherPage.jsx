import { Input, Pagination, Typography } from 'antd';
import TeacherList from './TeacherList';

const AllTeacherPage = () => {
  return (
    <div>
      <Typography.Title level={1} style={{ margin: '0 0 20px' }}>
        All Teachers
      </Typography.Title>
      <Input.Search
        style={{ width: 247, marginBottom: 20 }}
        placeholder="search for Teachers"
      ></Input.Search>
      <TeacherList />
      <div className="end">
        <Pagination total={50}></Pagination>
      </div>
    </div>
  );
};

export default AllTeacherPage;
