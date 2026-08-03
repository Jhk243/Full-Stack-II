import React, { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarPage() {

  const [events, setEvents] = useState([
    {
      id: "1",
      title: "📘 Facebook Campaign",
      date: "2026-07-28",
    },
    {
      id: "2",
      title: "📸 Instagram Reel",
      date: "2026-07-30",
    },
  ]);

  function handleDateClick(info) {

    const title = prompt(
      "Enter the post title:"
    );

    if (!title) return;

    setEvents((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
        date: info.dateStr,
      },
    ]);

  }

  function handleEventClick(info) {

    const choice = window.confirm(
      `Delete "${info.event.title}"?`
    );

    if (!choice) return;

    setEvents((prev) =>
      prev.filter(
        (event) =>
          event.id !== info.event.id
      )
    );

  }

  function handleEventDrop(info) {

    setEvents((prev) =>
      prev.map((event) =>
        event.id === info.event.id
          ? {
              ...event,
              date: info.event.startStr.substring(
                0,
                10
              ),
            }
          : event
      )
    );

  }

  return (

    <div
      style={{
        padding: "30px",
        background: "#ffffff",
        borderRadius: "15px",
        margin: "20px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,0.1)",
      }}
    >

      <h1>

        📅 Content Calendar

      </h1>

      <p>

        Click a date to schedule a post.
        Drag events to reschedule them.
        Click an event to delete it.

      </p>

      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        events={events}
        height="auto"
      />

    </div>

  );

}