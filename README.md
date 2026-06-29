# SubScribe - Subscription Management Dashboard

A modern, responsive, and interactive Subscription Management Dashboard prototype developed to fulfill the curriculum criteria for:
* **Assignment - 1**: Professional Dashboard Webpage Using Basic HTML Tags and Elements
* **Assignment - 2**: Interactive Dashboard Webpage Using CSS, JavaScript, and Animations

This application serves as a command center to track, audit, and optimize corporate and personal recurring subscription services.

---

## 🚀 Live Demo & Repository
* **GitHub Repository Link**: `https://github.com/[YOUR_USERNAME]/subscription-dashboard`
* **Vercel Live URL**: `https://subscription-dashboard-[YOUR_PROJECT_ID].vercel.app`

*(Note: Replace placeholders with your actual links after completing the deployment steps below).*

---

## 🛠️ Features Implemented

### Assignment 1 Requirements (Semantic HTML & Layout)
1. **Header**: Features the SubScribe SVG Logo, Application Title, Tagline ("Track. Optimize. Save."), and Student Profile indicators (Student Name and Registration Number).
2. **Navigation Bar**: Clean desktop and mobile responsive navigation links (Home, Dashboard, Features, Services, Reports, Join Premium, Contact, Logout).
3. **Welcome Section**: Dedicated hero welcome block, including the detailed project description, vision, and mission.
4. **Dashboard Statistics**: Dynamic grid featuring counters for:
   * Total Subscriptions
   * Active Seats
   * Monthly Spend
   * Transactions Executed
   * Critical Alerts
   * Pending Audit Checks
5. **Features & Services Sections**: Styled lists (`<ul>` and `<ol>` tags) describing the features and operational services.
6. **Latest Updates**: Continuous scrolling text ticker utilizing the semantic `<marquee>` tag (pauses on hover for usability).
7. **Application Modules Table**: Structural comparison table of backend application modules (Module ID, Module Name, Platform, Rating, Status, Description).
8. **Contact Section & Footer**: Organized contact grid with social links and standard Copyright details.

### Assignment 2 Requirements (CSS, Interactivity & Animations)
1. **Professional Theme**: Vibrant design scheme featuring custom font integration (Outfit), CSS shadows, border gradients, and glassmorphism layouts.
2. **Responsive Design**: Full compatibility across Widescreen displays, Laptops, Tablets, and Mobile viewports via custom CSS Media Queries.
3. **Interactive Navigation**: Active link highlighting based on current scroll position (scrollspy) and mobile hamburger sliding menu.
4. **Theme Switcher**: Floating dynamic toggle allowing users to swap between Light and Dark mode instantly. Choices persist using browser `localStorage`.
5. **Dynamic Stat Counters**: JavaScript engine that animates numeric statistics, counting smoothly from 0 to target values when scrolled into view.
6. **Notification Drawer**: Interactive sliding drawer widget displaying real-time alert updates, warning indicators, and a "Mark All as Read" action trigger.
7. **Image/Banner Carousel**: Automated and manual slider showcasing key platform modules. Contains prev/next navigational buttons and indicator dots.
8. **Client-Side Form Validation**: Fully validated registration form featuring regex-based checks for Email, exact 10-digit Phone checks, minimum length limits for Passwords/Names/Addresses, and dynamic 18+ Date-of-Birth calculations.
9. **Visual Animation Suite**: Integrated 5 distinct CSS animations:
   * Fade-in slide on welcome block
   * Hover-lift scale transformations on stats cards
   * Warning border glow pulse on critical notifications
   * Continuous sync spinning icon
   * Interactive progress bar matching scroll height
10. **Scroll-to-Top Button**: Floating button appearing after scrolling past 300px, which smooth-scrolls the browser viewport back to the top on click.

---

## 📂 Project Architecture

```
subscription-dashboard/
│
├── index.html       # Structural layout, forms, tables & SVGs
├── styles.css       # Core styling, layouts (flex/grid), light/dark variables, animations
├── app.js           # Interactive triggers, carousel, validations, counters, clock
└── README.md        # Project documentation and deployment guide
```

---

## 💻 Local Setup Instructions

Follow these simple steps to run the project locally on your machine:

1. **Clone the project files** or navigate into the workspace directory:
   ```bash
   cd subscription-dashboard
   ```

2. **Open in Browser**:
   * Simply double-click `index.html` to run in any standard modern web browser.
   * Alternatively, use VS Code "Live Server" extension or run a local Python HTTP server:
     ```bash
     python -m http.server 8000
     ```
     Navigate to `http://localhost:8000`.

---

## 📤 Version Control Setup (Git & GitHub)

Use these commands to upload your source code to a GitHub repository:

1. **Initialize Git Repository**:
   ```bash
   git init
   ```

2. **Add Files to Staging**:
   ```bash
   git add .
   ```

3. **Commit Changes**:
   ```bash
   git commit -m "feat: initial commit of subscription management dashboard app"
   ```

4. **Create a Repository on GitHub**:
   * Go to [github.com](https://github.com) and click **New Repository**.
   * Name it `subscription-dashboard` and keep it Public. Do not initialize with README.

5. **Link and Push**:
   ```bash
   git remote add origin https://github.com/[YOUR_USERNAME]/subscription-dashboard.git
   git branch -M main
   git push -u origin main
   ```

---

## ☁️ Cloud Deployment (Vercel)

Deploy your dashboard online for review and portfolio displays:

### Option A: Using Vercel GitHub Integration (Recommended)
1. Navigate to [vercel.com](https://vercel.com) and log in using your GitHub account.
2. Click **Add New** -> **Project**.
3. Import your `subscription-dashboard` repository from the list.
4. Keep the default settings (Vercel automatically detects static HTML/CSS/JS projects).
5. Click **Deploy**. Vercel will build and host your webpage.
6. Once deployed, copy the **Live URL** and update this README file.

### Option B: Using Vercel CLI
If you have node/npm installed and wish to deploy directly from terminal:
1. Install Vercel globally:
   ```bash
   npm install -g vercel
   ```
2. Run deployment command inside the project directory:
   ```bash
   vercel
   ```
3. Follow the CLI prompt setups. Choose defaults.
4. Run production release command:
   ```bash
   vercel --prod
   ```
5. Copy the outputted production URL.

---

## 🎓 Student Profile
* **Student Name**: John Doe
* **Registration Number**: 23IT721-001
* **Course Code**: 23IT721
* **Course Title**: Full Stack Development Laboratory
* **Assignment Reference**: Assignment 1 & 2
