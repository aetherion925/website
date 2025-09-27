# Aetherion - Software Company Portfolio Website

A professional portfolio website for Aetherion, showcasing our software development services, team, and projects with a powerful C# backend API for contact form handling.

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices with mobile-first approach
- **Modern UI/UX**: Clean, professional design with smooth scroll-triggered animations
- **Interactive Elements**: Hover effects, dynamic content loading, and video modals
- **Contact Form**: Integrated with C# Web API backend for reliable email delivery
- **Service Showcase**: Comprehensive overview of our offerings with dynamic tech stack
- **Team Profiles**: Dynamic team member loading with real photos and social links
- **Project Portfolio**: Dynamic project showcase with YouTube video integration
- **Technology Stack**: Comprehensive visual representation organized by categories

## 🎨 Design

The website uses Aetherion's brand colors:
- Primary: `#3b4476` (Dark Blue)
- Secondary: `#c9cff6` (Light Blue)
- Accent: `#ededed` (Light Gray)

## 📁 Project Structure

```
website/
├── backend/
│   ├── Program.cs                    # C# Web API with SMTP integration
│   ├── AetherionContactAPI.csproj    # .NET project file
│   ├── appsettings.json              # API configuration
│   ├── README.md                     # Backend documentation
│   └── Procfile                      # Render deployment config
├── assets/
│   ├── project_images/               # Dynamic project images
│   ├── team_images/                  # Dynamic team photos
│   └── tech_stack/                   # Technology stack SVG icons
├── index.html                        # Main HTML file with dynamic sections
├── styles.css                        # CSS styles and responsive animations
├── script.js                         # JavaScript with API integration
├── project.js                        # Dynamic project data
├── team.js                           # Dynamic team data
├── api-config.js                     # API URL configuration
├── api-test.html                     # API testing interface
├── build.sh                          # Render build script
├── DEPLOYMENT_GUIDE.md               # Complete deployment instructions
└── README.md                         # This file
```

## 🛠️ Setup Instructions

### 1. Frontend Deployment (GitHub Pages)

1. Push this repository to your GitHub account
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `gh-pages`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### 2. Backend API Deployment (Render)

#### Prerequisites
- Gmail account with 2-Factor Authentication enabled
- App Password generated for Gmail SMTP

#### Deploy to Render
1. Create new Web Service on [render.com](https://render.com)
2. Connect your GitHub repository
3. Configure build settings:
   ```
   Build Command: ./build.sh
   Start Command: cd backend/out && dotnet AetherionContactAPI.dll
   ```
4. Set environment variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-gmail-app-password
   TO_EMAIL=contact@aetherion.com
   ```

#### Configure Frontend API Connection
1. After Render deployment, copy your API URL
2. Update `api-config.js`:
   ```javascript
   production: 'https://your-render-app-name.onrender.com',
   ```

### 3. Local Development

#### Backend API
```bash
cd backend
dotnet restore
dotnet run
# API available at http://localhost:5000
```

#### Frontend
- Use VS Code Live Server or any HTTP server
- API will automatically detect local/production environment

#### Testing
- Open `api-test.html` to test API endpoints
- Submit contact form to verify email delivery

### 3. Customization

#### Update Company Information
- Edit contact details in the contact section
- Replace team member information
- Update project descriptions and links
- Modify service offerings as needed

#### Customize Content
- Replace placeholder text with actual company information
- Add real project images and links
- Update team photos and bios
- Modify the about section content

#### Styling Adjustments
- Colors can be modified in the CSS `:root` variables
- Font family can be changed in the Google Fonts import
- Layout adjustments can be made in the respective CSS sections

## 📱 Responsive Breakpoints

- Desktop: 1200px and above
- Tablet: 768px - 1199px
- Mobile: 480px - 767px
- Small Mobile: Below 480px

## 🔧 Technologies Used

### Frontend
- **HTML5**: Semantic markup with dynamic sections
- **CSS3**: Modern styling with Flexbox, Grid, and custom properties
- **Vanilla JavaScript**: Interactive functionality with IntersectionObserver API
- **Font Awesome**: Professional icons
- **Google Fonts**: Typography (Poppins)

### Backend
- **C# (.NET 8)**: Web API with built-in SMTP
- **ASP.NET Core**: Modern web framework
- **System.Net.Mail**: Native email sending
- **CORS**: Cross-origin resource sharing enabled

### Infrastructure
- **GitHub Pages**: Frontend hosting
- **Render**: Backend API hosting
- **Gmail SMTP**: Professional email delivery

## 🎯 Key Sections

1. **Hero Section**: Eye-catching introduction with smooth animations
2. **About**: Company mission, vision, and key statistics
3. **Services**: Dynamic service offerings with interactive cards
4. **Technology Stack**: Comprehensive tech showcase organized by categories:
   - Frontend Technologies
   - Backend Technologies  
   - Database Technologies
   - AI/ML Technologies
   - Cloud & DevOps
   - Mobile Development
   - Tools & Frameworks
   - Specialized Services
5. **Projects**: Dynamic portfolio with:
   - Real project images
   - YouTube video integration
   - Technology stack tags
   - Live demo and GitHub links
6. **Team**: Dynamic team profiles with:
   - Professional photos
   - Social media integration
   - Role-based descriptions
7. **Contact**: Professional contact form with:
   - Real-time validation
   - C# API backend
   - Dual email system (business + auto-response)

## 📈 Performance Features

- **Section-based Animations**: Optimized IntersectionObserver for smooth scroll effects
- **Dynamic Loading**: Projects and team data loaded from separate JS files
- **Responsive Images**: Real project and team images with proper sizing
- **CSS Custom Properties**: Centralized design system for easy theming
- **Mobile-first Design**: Progressive enhancement for all device sizes
- **Hardware Acceleration**: CSS transforms for smooth animations
- **Lazy Loading**: Content appears as user scrolls

## 🔒 Contact Form Features

- **C# Backend API**: Reliable server-side email processing
- **Gmail SMTP**: Professional email delivery through Gmail
- **Dual Email System**: 
  - Business notification with complete inquiry details
  - Professional auto-response to customer
- **HTML Email Templates**: Branded, mobile-responsive email design
- **Input Validation**: Both client-side and server-side validation
- **Error Handling**: Comprehensive error logging and user feedback
- **CORS Support**: Proper cross-origin handling for seamless integration
- **Environment Detection**: Automatic API URL switching (local/production)

## � API Endpoints

### Contact API
- **POST** `/api/contact/send` - Send contact form email
- **GET** `/api/contact/health` - API health check

### Request Example
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "company": "Acme Corp",
  "service": "Web Development",
  "message": "I need help with my website"
}
```

### Response Example
```json
{
  "success": true,
  "message": "Thank you for your message! We'll get back to you within 24 hours to schedule your discovery call."
}
```

## 🔧 Customization

### Update Content
- **Projects**: Edit `project.js` to add/modify portfolio items
- **Team**: Edit `team.js` to update team member information
- **Services**: Modify service cards in `index.html`
- **Tech Stack**: Add/remove SVG icons in `assets/tech_stack/`

### Styling
- **Colors**: Update CSS custom properties in `:root`
- **Typography**: Change Google Fonts import and CSS font families
- **Layout**: Modify responsive breakpoints and grid layouts

### API Configuration
- **Local Development**: API automatically uses `http://localhost:5000`
- **Production**: Update `api-config.js` with your Render URL
- **Email Settings**: Configure SMTP via Render environment variables

## 📁 Asset Management

### Project Images
- Location: `assets/project_images/`
- Format: JPG/PNG, recommended size: 800x600px
- Naming: Match project slugs in `project.js`

### Team Photos
- Location: `assets/team_images/`
- Format: JPG/PNG, recommended size: 300x300px (square)
- Naming: Match team member IDs in `team.js`

### Tech Stack Icons
- Location: `assets/tech_stack/`
- Format: SVG for scalability
- Naming: Lowercase with hyphens (e.g., `react-native.svg`)

## 🔍 Troubleshooting

### Contact Form Issues
1. Check API health endpoint: `https://your-api-url.onrender.com/api/contact/health`
2. Verify environment variables in Render dashboard
3. Check browser network tab for API errors
4. Use `api-test.html` for isolated testing

### Common Issues
- **CORS Errors**: Verify API URL in `api-config.js`
- **Email Not Sending**: Check Gmail SMTP credentials and app password
- **API Not Responding**: Check Render deployment logs
- **Local Development**: Ensure .NET 8 SDK is installed

## 📞 Support

For technical support or customization help:
- Check `DEPLOYMENT_GUIDE.md` for detailed setup instructions
- Use `api-test.html` for API debugging
- Review Render logs for backend issues
- Contact the Aetherion development team

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ by the Aetherion Team**  
*Powered by C# .NET 8 Web API and modern web technologies*