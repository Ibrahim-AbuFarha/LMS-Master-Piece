import { Link } from 'react-router-dom';
import { Card, Typography, Row, Col, Space } from 'antd';
import DeleteModal from '../../../components/common/DeleteModal';
import EditClassModal from './EditClassModal';

const { Text } = Typography;

const ClassCard = ({ onDelete, onEdit, classRoom }) => {
  return (
    <Card>
      <Row gutter={[16, 16]} align="middle">
        <Col>
          <Link to={`/classDetails/${classRoom._id}`}>
            <img
              src={classRoom.imgUrl}
              alt=""
              style={{ width: '80px', height: '80px' }}
            />
          </Link>
        </Col>
        <Col flex="auto">
          <Space direction="vertical" align="center">
            <Text>{classRoom.subject}</Text>
            <Text
              type="secondary"
              style={{ fontSize: '12px', color: '#888888' }}
            >
              Subject
            </Text>
          </Space>
        </Col>
        <Col flex="auto">
          <Space direction="vertical" align="center">
            <Text>{classRoom.grade}</Text>
            <Text
              type="secondary"
              style={{ fontSize: '12px', color: '#888888' }}
            >
              Grade
            </Text>
          </Space>
        </Col>
        <Col flex="auto">
          <Space direction="vertical" align="center">
            <Text>{classRoom.students.length}</Text>
            <Text
              type="secondary"
              style={{ fontSize: '12px', color: '#888888' }}
            >
              N.Students
            </Text>
          </Space>
        </Col>
        <Col flex="auto">
          <Space direction="vertical" align="center">
            <Text>{classRoom.courseId}</Text>
            <Text
              type="secondary"
              style={{ fontSize: '12px', color: '#888888' }}
            >
              Course ID
            </Text>
          </Space>
        </Col>
        <Col flex="auto">
          <EditClassModal onEdit={onEdit} classRoom={classRoom} />
        </Col>

        <Col flex="auto">
          <DeleteModal
            title={'Delete Class'}
            text={'Are you sure you want to delete this class'}
            onDelete={() => onDelete(classRoom._id)}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ClassCard;
