Project Implemenatation:
 1. User Authentication System (JWT-based)
Implemented user register/login functionality using JSON Web Tokens.
Used role-based access (User/Admin).
Stored user data in MongoDB using Mongoose models.
2.Credit System
Users earn credits by logging in daily.
Users earn credits by interacting with the feed (save/share/report).
Created an admin route to view and update credits manually.
3.Feed Aggregator
Integrated public APIs (e.g., Reddit, simulated Twitter) to fetch feed posts.
Parsed and displayed posts on the frontend in a scrollable UI.
Enabled users to:
Save posts to their Dashboard.
Share posts (simulate with copy link).
Report posts (flag as inappropriate).
4.Dashboards
User Dashboard: shows profile info, earned credits, saved posts, and recent activity.
Admin Dashboard:
Shows list of users and their credits.
Displays system-wide engagement stats (e.g., number of reports or saved posts).
Ability to edit user credits and Delete  User.
Tech Stack
Frontend: React.js (with Axios, Context API for auth, React Router)
Backend: Node.js + Express.js
Database: MongoDB with Mongoose ODM
Authentication: JWT-based token system

Screenshots of App:
![image](https://github.com/user-attachments/assets/b1789be0-7a98-45b4-8568-5d54d6559323)
![image](https://github.com/user-attachments/assets/146ea152-2f06-45e8-bf6b-5171c6137337)
![image](https://github.com/user-attachments/assets/669de71f-fc0f-481c-afc4-84bfadb6eecc)
![image](https://github.com/user-attachments/assets/f391217a-03f6-4af5-9d12-8d90a593b1ac)
![image](https://github.com/user-attachments/assets/0ca963fb-a740-4100-80ca-59fd71694888)
![image](https://github.com/user-attachments/assets/80dcc24d-406b-4607-89db-bac90dd13ece)
![image](https://github.com/user-attachments/assets/34299f2e-27d9-407f-842c-8e795dfbb28f)

![image](https://github.com/user-attachments/assets/f203633d-e29e-4b93-bdff-ae783a9c8322)







