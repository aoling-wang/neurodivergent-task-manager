# Sisyphus, Momentum-Based Task Manager

### A mobile app built in Expo and React Native that helps neurodivergent users with task initiation and completion

> **Portfolio Project · Javascript/Typescript · React Native · CSS · MMKV · Expo · Android · iOS**

---

**"Well, since I'm already up..."**

**Sisyphus** is a small frontend productivity application built using **React Native and Expo Go** that attempts to solve the issue of attention dysregulation in individuals with neurodivergents using color psychology, saturation, and simple design.

<p align="center">
  <img width="655" height="400" alt="image" src="https://github.com/user-attachments/assets/520a35a7-2c76-4826-b62c-2f8e458c3cea" />
</p>

## Overview

The application interface is simple and its navigation clear. The primary goal of this project was to demonstrate the use of components and state management to create responsive highlights on current and urgent tasks to guide attention and focus for those with conditions that affect attention regulation. MAking highlight status depneded on task completion, this task manager provides a structured progression  of thigns to do instead of a jumble of tasks. Built in React, the components are reusable and adjustable to accomodate lists of various lengths and complexities.

I built this project to explore a common question in code reusability:

> **How can we structure code efficiently to consolidate properties and reduce unnecessary redundencies in the code base?**

Simplifing the backend to a test data file and device local storage with MMKV, this project focuses on **reusability, responsive and fast re-renders, and constants consolidation** — structuring files to centralizes types, interfaces, colors, and styles in one place for improved readability and make future adjustment easier.

---

## What Does It Do?

Drawing on my own experiences as an individual with diagnosed ADHD, I built the app to guides user through their daily tasks using strict progression to take advantage of mental momentum and power through tasks of raising difficulty.

As users complete all tasks in a given box, the app will unlock and highlight new boxes of increasing complexity. This system keeps focus on a small set of tasks and avoids overwhelming users with decision paralysis if too many tasks grab their attetnion at once. 

<p align="center">
  <img width="655" height="400" alt="image" src="https://github.com/user-attachments/assets/520a35a7-2c76-4826-b62c-2f8e458c3cea" />
</p>

Although this application is very simple, I utilizes <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10159421/">productivity research</a> by Elijah Myers, Erin T. Drees, and Jeff Cain to help users focus on the immediate next step. 

## BTS: MMKV 4.0 and Device Local Storage

The application uses **MMKV Storage** for local storage and connection initialization. This package creates a nonrelational database within the device itself and stores stringified JSON data for both task lists and user settings and preferences. As of the current implementation, Expo Go does not support MMKV. Developers will have to user the test data file within the src folder to store any tasks.

## What I Learned

* **Reusable React components** — building flexible components that can accommodate different task lists and levels of complexity
* **State management** — using application state to control task completion, progression, and which tasks receive visual emphasis
* **Conditional rendering** — changing the interface dynamically based on task completion and progression
* **React Native styling** — using centralized styles and shared constants to keep the interface consistent and easier to modify
* **Constants consolidation** — organizing colors, styles, types, and interfaces into reusable files instead of duplicating values throughout the application
* **Local device storage** — using MMKV to explore persistent, nonrelational storage for task data and user preferences
* **Expo and React Native development** — building and testing a mobile application across Android and iOS development environments
* **UX-driven development** — translating a specific user experience problem into interface behaviors designed to reduce visual overload and guide attention
* **Accessibility considerations** — recognizing how color and visual hierarchy affect how users interact with an application

## The Stack

| Technology                 | Purpose                                |
| -------------------------- | -------------------------------------- |
| **JavaScript/TypeScript**  | Application language and strict typing |
| **Expo**                   | Server runtime                         |
| **React Native**           | REST API framework                     |
| **npm**                    | Package management                     |

## Project Setup

Check that Expo SDK 57 and npm 12 are properly installed before following the instructions below.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

Reminder: Be sure to have your emulator (e.g. Android Studio, Xcode Simulator, TestFlight) open and running before starting the app

#### Development

```bash
npm run start
```

#### Watch Mode

```bash
npm run start:dev
```

## Next Steps

### AI Integration

Add an LLM to review tasks during initial creation to flag any vague or unactionable descriptions and offer task breakdowns for large complex tasks to aid with task initiation. Examples include:

Flagging "Refactor application code"

Creating a drop down list of suggested small steps:

* Review index.tsx
* Adjust colors
* Exclude last years revenue from calculations
* Update and test new database url

### Database Integration

Replace the current in-memory medication data with a persistent database to explore:

* PostgreSQL
* TypeORM
* Database migrations
* Persistent container storage

### Cross Device Persistence

Utilize cloud storage infrasture like Google Cloud, Microsoft Azure, or AWS Aurora to allow users to access their task list from multiple devices.

### Redesign For Accesibility

Adjust color contrast, font size, and aria labels for the color-blind and visually impaired

---

**Project Goal:** Use a small frontend application to understand how **reusable components, state management, compilers improve mobile app development**.
