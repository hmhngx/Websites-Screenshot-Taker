# 📸 Screenshot Studio
 Screenshot Studio is a React-based web application that allows users to capture screenshots of websites using the APIFlash API. With a sleek, modern interface, users can customize screenshot parameters, view their latest capture, and maintain a gallery of previous screenshots—all while keeping track of their API quota.

## ✨ Features
- Customizable Screenshots: Capture website screenshots with adjustable parameters:
URL (with or without protocol)
Image format (jpeg, png, webp)
Options to hide ads and cookie banners
Custom width and height in pixels
- Interactive Form: A user-friendly form with Flexbox layout, glassmorphism effects, and helpful input descriptions.
- Live Query Preview: See the API query being built as you fill out the form.
- Latest Capture Display: View the most recent screenshot with a smooth fade-in animation.
- Screenshot Gallery: A Flexbox-based gallery to store and display all previous screenshots with hover effects.
- Quota Tracking: Monitor your APIFlash query quota with a fixed reminder at the top-right corner.
- Error Handling: Detailed error messages for invalid inputs, API failures, or quota issues.
- Responsive Design: Fully responsive layout with media queries for mobile and desktop devices.
- Aesthetic UI: Modern design with glassmorphism (using backdrop-filter), gradient backgrounds, animations, and a cohesive color scheme.

## 🛠️ Tech Stack
- **Frontend:** React (with Vite for fast development)
- **Styling:** CSS with Flexbox, glassmorphism effects, and animations
- **API:** APIFlash for screenshot generation and quota tracking
- **Environment:** Node.js, npm

## 📦 Setup Instructions
Follow these steps to set up and run the app locally.

### Prerequisites
Node.js (v16 or higher) and npm installed on your machine.
An active APIFlash account with a valid API key (sign up at apiflash.com).
Installation

### Clone the Repository:
```sh
git clone https://github.com/your-username/screenshot-studio.git
cd screenshot-studio

```
### Install Dependencies:

```sh
npm install

```
### Set Up Environment Variables:
Create a .env file in the root directory.
Add your APIFlash access key:
```sh
VITE_APP_ACCESS_KEY="your_apiflash_access_key_here"
```

Replace your_apiflash_access_key_here with your actual API key from APIFlash.
### Run the Development Server:
```sh
npm run dev

```

The app will be available at http://localhost:5173 (or another port if 5173 is in use).

## 🚀 Usage
### Open the App:
Navigate to http://localhost:5173 in your browser after starting the development server.

### Design Your Screenshot:
Fill out the form under "Design Your Screenshot":
- URL: Enter the website URL (e.g., www.example.com or https://www.example.com).
- Format: Choose an image format (jpeg, png, or webp).
- No Ads: Set to true or false to hide ads.
- No Cookie Banners: Set to true or false to remove cookie banners.
- Width/Height: Specify dimensions in pixels (e.g., 1920 for width, 1080 for height).
- Default values are applied if fields are left empty (e.g., jpeg for format, 1920x1080 for dimensions).

### Capture the Screenshot:
- Click the "Capture It! 📷" button to generate the screenshot.
- The latest screenshot will appear under "Latest Capture" with a fade-in animation.

## View the Gallery:
- All successful screenshots are added to the "Your Screenshot Gallery" section at the bottom.
- Hover over images to see a subtle scale effect and a numbered overlay.

### Monitor Your Quota:
- A quota reminder in the top-right corner shows your remaining APIFlash queries (e.g., "Quota: 98 / 100").
- The quota updates after each successful screenshot capture.

### Check the Query Preview:
The "Current Query Preview" section shows the API query being sent to APIFlash, updating in real-time as you fill out the form.

## 🖼️ Walkthrough:
![wlkthr](/public/screenshot studio.gif)

Main interface with the form and quota display.
A successful screenshot capture with the gallery populated.

## 🐛 Troubleshooting

### "Failed to fetch quota" Error:
Ensure your API key in .env is correct and active.
Check your internet connection.
Verify your APIFlash account status (e.g., quota limits).

### "API call failed with status 400":
Double-check the URL format (e.g., avoid double protocols like https://https://...).
Ensure the website is accessible and not blocked by the API.

### Quota Exhausted:
If your quota reaches 0, you’ll need to wait for the reset (shown in the quota display) or upgrade your APIFlash plan.

## 🎨 Customization
The app is designed to be easily customizable:

* Styling: Modify src/App.css to change colors, animations, or layouts.
Adjust --primary and --secondary in :root for a new color scheme.
Tweak the backdrop-filter effects for different glassmorphism styles.
* Form Inputs: Add or remove input fields in src/Components/APIForm.jsx and update the inputs state in App.jsx.
*   Gallery Features: Enhance the gallery in src/Components/Gallery.jsx (e.g., add delete buttons, download options).

## 📜 License
This project is licensed under the MIT License. See the  file for details.