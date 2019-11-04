import React, { useState } from "react";
import StudentCalendar from "../StudentCalendar";
import { Paper, Tabs, Tab } from "@material-ui/core";

const StudentDashboard = () => {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <Paper>
        <Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Schedule" />
        </Tabs>
      </Paper>
      <div className="calendar">
        <StudentCalendar />
      </div>
    </div>
  );
};

export default StudentDashboard;
