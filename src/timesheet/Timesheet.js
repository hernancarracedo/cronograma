import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";

class Timesheet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locale: "es-es",
      onBeforeRowHeaderRender: function (args) {
        args.row.horizontalAlignment = "center";
      },
      crosshairType: "Header",
      timeHeaders: [{"groupBy":"Hour"},{"groupBy":"Cell","format":"mm"}],
      scale: "CellDuration",
      cellDuration: 30,
      viewType: "Days",
      days: DayPilot.Date.today().daysInMonth(),
      startDate: DayPilot.Date.today().firstDayOfMonth(),
      showNonBusiness: true,
      businessWeekends: false,
      floatingEvents: true,
      eventHeight: 30,
      eventMovingStartEndEnabled: false,
      eventResizingStartEndEnabled: false,
      timeRangeSelectingStartEndEnabled: false,
      groupConcurrentEvents: false,
      eventStackingLineHeight: 100,
      allowEventOverlap: true,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: function (args) {
        var dp = this;
        DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function(modal) {
          dp.clearSelection();
          if (!modal.result) { return; }
          dp.events.add(new DayPilot.Event({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            resource: args.resource,
            text: modal.result
          }));
        });
      },
      eventMoveHandling: "Update",
      onEventMoved: function (args) {
        this.message("Event moved");
      },
      eventResizeHandling: "Update",
      onEventResized: function (args) {
        this.message("Event resized");
      },
      eventDeleteHandling: "Update",
      onEventDeleted: function (args) {
        this.message("Event deleted");
      },
      eventClickHandling: "Disabled",
      eventHoverHandling: "Disabled",
    };
  }

  componentDidMount() {

    // load resource and event data
    this.setState({
      startDate: DayPilot.Date.today(),
      events: [
        {
          id: 1,
          text: "Event 1",
          start: DayPilot.Date.today().addHours(10),
          end: DayPilot.Date.today().addHours(14)
        },
        {
          id: 2,
          text: "Event 2",
          start: "2018-06-02T10:00:00",
          end: "2018-06-02T11:00:00",
          barColor: "#38761d",
          barBackColor: "#93c47d"
        }
      ]
    });

  }

  render() {
    var {...config} = this.state;
    return (
      <div>
        <DayPilotScheduler
          {...config}
          ref={component => {
            this.calendar = component && component.control;
          }}
        />
      </div>
    );
  }
}

export default Timesheet;
