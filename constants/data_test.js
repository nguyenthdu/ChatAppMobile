import { StyleSheet, Text, View } from "react-native";
import React from "react";

// Data.js
const data = [
  {
    room_id: 1,
    room_name: "Room 1",
    avatar_room: "https://i.pravatar.cc/300",
    user_reservations: [
      {
        user_id: 1,
        user_name: "Nguyen Van A",
        user_avatar: "https://i.pravatar.cc/300",
        message: [
          {
            message_id: 1,
            message: "Hello",
            created_at: "2021-09-01 14:40:00",
          },
          {
            message_id: 2,
            message: "Hi",
            created_at: "2021-09-01 16:31:00",
          },
        ],
      },
      {
        user_id: 2,
        user_name: "Nguyen Van FFF",
        user_avatar: "https://i.pravatar.cc/300",
        message: [
          {
            message_id: 1,
            message: "Hello",
            created_at: "2021-09-01 14:20:00",
          },
          {
            message_id: 2,
            message: "Hi",
            created_at: "2021-09-01 12:30:00",
          },
        ],
      },
    ],
  },
  {
    room_id: 2,
    room_name: "Room 2",
    avatar_room: "https://i.pravatar.cc/300",
    user_reservations: [
      {
        user_id: 1,
        user_name: "Nguyen Van A",
        user_avatar: "https://i.pravatar.cc/300",
        message: [
          {
            message_id: 1,
            message: "Hello",
            created_at: "2021-09-01 18:20:00",
          },
          {
            message_id: 2,
            message: "Hi",
            created_at: "2021-09-01 20:31:00",
          },
        ],
      },
      {
        user_id: 2,
        user_name: "Nguyen Van FFF",
        user_avatar: "https://i.pravatar.cc/300",
        message: [
          {
            message_id: 1,
            message: "Hello",
            created_at: "2021-09-01 12:20:00",
          },
          {
            message_id: 2,
            message: "Hi",
            created_at: "2021-09-01 15:31:00",
          },
        ],
      },
      {
        user_id: 4,
        user_name: "Nguyen Van FFF",
        user_avatar: "https://i.pravatar.cc/300",
        message: [
          {
            message_id: 1,
            message: "Hello",
            created_at: "2021-09-01 15:20:00",
          },
          {
            message_id: 2,
            message: "Hi",
            created_at: "2021-09-01 14:31:00",
          },
        ],
      },
    ],
  },
  {
    room_id: 3,
    room_name: "Room 3",
    avatar_room: "https://i.pravatar.cc/300",
    user_reservations: [
      {
        user_id: 1,
        user_name: "Nguyen Van A",
        user_avatar: "https://i.pravatar.cc/300",
        message: [
          {
            message_id: 1,
            message: "Hello",
            created_at: "2021-09-01 14:40:00",
          },
          {
            message_id: 2,
            message: "Hi",
            created_at: "2021-09-01 16:31:00",
          },
        ],
      },
      {
        user_id: 2,
        user_name: "Nguyen Van FFF",
        user_avatar: "https://i.pravatar.cc/300",
        message: [
          {
            message_id: 1,
            message: "Hello",
            created_at: "2021-09-01 14:20:00",
          },
          {
            message_id: 2,
            message: "Hi",
            created_at: "2021-09-01 12:30:00",
          },
        ],
      },
    ],
  },
  {
    room_id: 4,
    room_name: "Room 4",
    avatar_room: "https://i.pravatar.cc/300",
    user_reservations: [
      {
        user_id: 1,
        user_name: "Nguyen Van A",
        user_avatar: "https://i.pravatar.cc/300",
        message: [
          {
            message_id: 1,
            message: "Hello",
            created_at: "2021-09-01 14:40:00",
          },
          {
            message_id: 2,
            message: "Hi",
            created_at: "2021-09-01 16:31:00",
          },
        ],
      },
      {
        user_id: 2,
        user_name: "Nguyen Van FFF",
        user_avatar: "https://i.pravatar.cc/300",
        message: [
          {
            message_id: 1,
            message: "Hello",
            created_at: "2021-09-01 14:20:00",
          },
          {
            message_id: 2,
            message: "Hi",
            created_at: "2021-09-01 12:30:00",
          },
        ],
      },
    ],
  },
  {
    room_id: 5,
    room_name: "Room 5",
    avatar_room: "https://i.pravatar.cc/300",
    user_reservations: [
      {
        user_id: 1,
        user_name: "Nguyen Van A",
        user_avatar: "https://i.pravatar.cc/300",
        message: [
          {
            message_id: 1,
            message: "Hello",
            created_at: "2021-09-01 14:40:00",
          },
          {
            message_id: 2,
            message: "Hi",
            created_at: "2021-09-01 16:31:00",
          },
        ],
      },
      {
        user_id: 2,
        user_name: "Nguyen Van FFF",
        user_avatar: "https://i.pravatar.cc/300",
        message: [
          {
            message_id: 1,
            message: "Hello",
            created_at: "2021-09-01 14:20:00",
          },
          {
            message_id: 2,
            message: "Hi",
            created_at: "2021-09-01 12:30:00",
          },
        ],
      },
    ],
  },
  {
    room_id: 6,
    room_name: "Room 6",
    avatar_room: "https://i.pravatar.cc/300",
    user_reservations: [
      {
        user_id: 1,
        user_name: "Nguyen Van A",
        user_avatar: "https://i.pravatar.cc/300",
        message: [
          {
            message_id: 1,
            message: "Hello",
            created_at: "2021-09-01 14:40:00",
          },
          {
            message_id: 2,
            message: "Hi",
            created_at: "2021-09-01 16:31:00",
          },
        ],
      },
      {
        user_id: 2,
        user_name: "Nguyen Van FFF",
        user_avatar: "https://i.pravatar.cc/300",
        message: [
          {
            message_id: 1,
            message: "Hello",
            created_at: "2021-09-01 14:20:00",
          },
          {
            message_id: 2,
            message: "Hi",
            created_at: "2021-09-01 12:30:00",
          },
        ],
      },
    ],
  },
];

export default data;
