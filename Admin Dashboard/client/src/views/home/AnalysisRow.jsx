import { HomeOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Space, Statistic, Typography } from "antd";

function AnalysisRow({ analysis }) {
  //

  return (
    <div style={{ marginBottom: "40px" }}>
      <Typography.Title style={{ marginBottom: 20 }} level={4}>
        Dashboard
      </Typography.Title>
      <Row gutter={10} direction="horizontal">
        <Col span={6}>
          <DashboardCard
            icon={
              <HomeOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"ClassRooms"}
            value={analysis.numClassRooms}
          />
        </Col>

        <Col span={6}>
          {" "}
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Teachers"}
            value={analysis.numTeachers}
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Students"}
            value={analysis.numStudents}
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon={
              <ReadOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Courses"}
            value={analysis.numCourses}
          />
        </Col>
      </Row>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space size={15} direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

export default AnalysisRow;
