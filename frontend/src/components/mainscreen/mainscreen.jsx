import React, { useState, useEffect } from 'react';
import './mainscreen.css';
import { Icon } from '@iconify/react';
import axios from 'axios';

const MainScreen = ({language }) => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ['Web Developer', 'UI/UX Designer'];
  const [activeFilter, setActiveFilter] = useState('all');
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ ...notification, show: false }), 5000);
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post('https://backend-portfolio-eight-red.vercel.app/api/email/send-message', formData);
      showNotification('success', 
        language === 'en' ? 'Message sent successfully!' :
        language === 'vi' ? 'Gửi tin nhắn thành công!' :
        'Nachricht erfolgreich gesendet!'
      );
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      showNotification('error', 
        language === 'en' ? `Error: ${errorMessage}` :
        language === 'vi' ? `Lỗi: ${errorMessage}` :
        `Fehler: ${errorMessage}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const contactContent = {
    en: {
      title: "Let's have a connection",
      description: "I'm currently looking for new opportunities, my inbox is always open. Send message to my email if you needed in this inbox or via my social media account.",
      labels: {
        name: "Your name",
        email: "Your email",
        message: "Your message",
        submit: "Send Message"
      }
    },
    vi: {
      title: "Hãy kết nối với tôi",
      description: "Tôi đang tìm kiếm những cơ hội mới và hộp thư của tôi luôn đón chờ. Hãy gửi tin nhắn cho tôi thông qua form này đến email của tôi hoặc các mạng xã hội dưới đây nếu bạn cần liên hệ.",
      labels: {
        name: "Tên của bạn",
        email: "Email của bạn",
        message: "Lời nhắn của bạn",
        submit: "Gửi tin nhắn"
      }
    },
    de: {
      title: "Lass uns eine Verbindung haben",
      description: "Ich bin derzeit auf der Suche nach neuen Möglichkeiten, mein Posteingang ist immer offen. Senden Sie bei Bedarf eine Nachricht an meine E-Mail-Adresse in diesem Posteingang oder über mein Social-Media-Konto.",
      labels: {
        name: "Ihre name",
        email: "Ihre E-Mail",
        message: "Ihre Nachricht",
        submit: "Nachricht senden"
      }
    }
  };

  const projectsData = [
    {
      id: 1,
      title: "LOGICAL",
      category: "web",
      description: "Fullstack gaming playground (Sudoku, Puzzle and Solitaire) with React & Node.js",
      image: "../LOGICAL.png",
      links: [
        { icon: "mdi:github", url: "https://github.com/tranthangok/LOGICAL" },
        { icon: "solar:figma-bold", url: "https://www.figma.com/design/BpH19IB9MdYnl3fjUaWGEM/LOGICAL?node-id=0-1&p=f&t=eb5FRuWUiItinfFm-0" },
        { icon: "material-symbols:link", url: "https://logical-sage.vercel.app" }
      ]
    },
    {
      id: 2,
      title: "ViRoute", 
      category: "web",
      description: "Bus finding website in Vietnam with React & Django",
      image: "../ViRoute.png",
      links: [
        { icon: "mdi:github", url: "https://github.com/khoidm2004/ViRoute" },
        { icon: "solar:figma-bold", url: "https://www.figma.com/design/0y4rizXc4Fi6xLfZjg90Tm/Figma-basics?node-id=838-803&p=f" },
        { icon: "material-symbols:link", url: "https://vi-route.vercel.app/" }
      ]
    },
    {
      id: 3,
      title: "Diotp Project", 
      category: "python",
      description: "Extracting temperature and humidity data from Raspberry Pi, sensor and displaying it on a webpage. Using Python, HTML and CSS",
      image: "../Humidity.png", 
      links: [
        { icon: "mdi:github", url: "https://github.com/tranthangok/diotp-2nd?tab=readme-ov-file" }
      ]
    },
    {
      id: 4,
      title: "Student Management Program", 
      category: "python",
      description: "A program to manage students' information using Python and Tkinter",
      image: "../StudentManagement.png",
      links: [
        { icon: "mdi:github", url: "https://github.com/tranthangok/Student-management-" }
      ]
    },
    {
      id: 5,
      title: "Convert Word to PDF Program", 
      category: "python",
      description: "A program to convert Word to PDF files using Python and Tkinter",
      image: "../WordtoPDF.png",
      links: [
        { icon: "mdi:github", url: "https://github.com/tranthangok/WordtoPDF-Python" }
      ]
    },
  ];

  const content = {
    about: {
      en: (
        <div className="about-content">
          <div className="text-content">
            <h1>HELLO, I'm Thang</h1>
            <div className="role-container">
              <span className="changing-role">{roles[currentRole]}</span>
            </div>
            <p className="subtext">I'm a student at LAB University of Applied Science and I'm looking forward to having an Internship or Summer Trainee position.</p>
              <div className="button-group">
              <a href="#contact" className="action-btn contact-btn">
                Contact Me
              </a>
              <a 
                href="/ThangCV_2025.pdf"
                className="action-btn cv-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check My CV
              </a>
            </div>
          </div>
          <div className="image-container">
            <img src="../MypictureThang.jpg" alt="Thang's Profile" />
          </div>
        </div>
      ),
      vi: (
        <div className="about-content">
          <div className="text-content">
            <h1>XIN CHÀO, Tôi là Thắng</h1>
            <div className="role-container">
              <span className="changing-role">{roles[currentRole]}</span>
            </div>
            <p className="subtext">
              Tôi là sinh viên tại Đại học khoa học Ứng dụng LAB và đang mong muốn tìm kiếm cơ hội Thực tập hoặc Học việc trong hè.
            </p>
            <div className="button-group">
              <a href="#contact" className="action-btn contact-btn">
                Liên hệ ngay
              </a>
              <a 
                href="/ThangCV_2025.pdf"
                className="action-btn cv-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Xem CV
              </a>
            </div>
          </div>
          <div className="image-container">
            <img src="../MypictureThang.jpg" alt="Hồ sơ Thắng" />
          </div>
        </div>
      ),
      de: (
        <div className="about-content">
          <div className="text-content">
            <h1>HALLO, ich bin Thang</h1>
            <div className="role-container">
              <span className="changing-role">{roles[currentRole]}</span>
            </div>
            <p className="subtext">
            Ich bin Student an der LAB Fachhochschule und suche nach Praktikums- oder 
            Sommerausbildungsmöglichkeiten.
            </p>
            <div className="button-group">
              <a href="#contact" className="action-btn contact-btn">
                Kontaktier mich!
              </a>
              <a 
                href="/ThangCV_2025.pdf"
                className="action-btn cv-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lebenslauf ansehen
              </a>
            </div>
          </div>
          <div className="image-container">
            <img src="../MypictureThang.jpg" alt="Hồ sơ Thắng" />
          </div>
        </div>
      )
    },
    
    aboutme: {
      en: (
        <div className="aboutme-sections">
          <div className="professional-info">
            <div className="info-card">
              <h3>💻 Technical Skills</h3>
              <ul>
                <li>Frontend: ReactJS, CSS, HTML<br/> UI/UX Design: Figma, AdobePhotoshop </li>
                <li>Backend: NodeJS - ExpressJS, MongoDB, MySQL</li>
                <li>Services: AWS, Google Cloud, Vercel - Github</li>
                <li>Others: Python (Pandas, NumPy, Tkinter), Microsoft Office(PowerPoint, Word, Excel, PowerBI)</li>
              </ul>
            </div>
    
            <div className="info-card">
              <h3>🎓 Education</h3>
              <p className="timeline">2023-2027 (Still ongoing)<br/>LAB University of Applied Science - Finland<br/>Industrial Information Technology</p>
                <ul>
                  <li>GPA: 4.2/5</li>
                  <li>Languages: English C1, Vietnamese C2, German A2</li>
                </ul>
            </div>
    
            <div className="info-card">
              <h3>🚀 Experiences</h3>
              <p className="timeline">1/6/2024-30/8/2024<br/>The Electrical Joint Stock 1 - Hanoi, Vietnam<br/>IT Supporter</p>
              <ul>
                <li>Support colleagues with computer issues and ensure proper machine operation</li>
                <li>Use office software to collect data and help write reports for instructors </li>
                <li>Use other software such as AdobePhotoshop to correct text and photo errors</li>
                <li>Manage shared cloud to support work</li>
              </ul>
            </div>
          </div>
    
          <div className="personal-corner">
            <div className="photo-info-container">
              <div className="corner-photo">
                <img src="../Cornerphoto.jpg" alt="Travel Memories" />
              </div>
              
              <div className="corner-info">
                <h3>A little bit about myself - As a Travel Enthusiast</h3>
                <p className="subtext-aboutme">
                  I believe journeys shape personalities. Through my travels, I've learned to embrace 
                  diverse cultures and find beauty in every corner of the world.
                </p>
                
                <div className="travel-stats">
                  <div className="stat-box">
                    <div className="stat-number">10+</div>
                    <p>Countries Visited</p>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number">62+</div>
                    <p>Cities Explored</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="map-container">
                <iframe 
                  src="https://beeneverywhere.net/usermap/21522?width=1250&height=550"
                  title="Thang Tran Dac's Travel Map"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
          </div>
        </div>
      ),
      vi: (
        <div className="aboutme-sections">
          <div className="professional-info">
            <div className="info-card">
              <h3>💻 Skills Chuyên ngành</h3>
              <ul>
                <li>Frontend: ReactJS, CSS, HTML<br/> UI/UX Design: Figma, AdobePhotoshop </li>
                <li>Backend: NodeJS - ExpressJS, MongoDB, MySQL</li>
                <li>Dịch vụ: AWS, Google Cloud, Vercel - Github</li>
                <li>Khác: Python (Pandas, NumPy, Tkinter), Microsoft Office(PowerPoint, Word, Excel, PowerBI)</li>
              </ul>
            </div>
    
            <div className="info-card">
              <h3>🎓 Education</h3>
              <p className="timeline">2023-2027 (Đang học)<br/>Trường Đại học Khoa học Ứng dụng LAB - Phần Lan<br/>Công Nghệ Thông Tin</p>
                <ul>
                  <li>GPA: 4.2/5</li>
                  <li>Ngôn ngữ: Tiếng Anh C1, Tiếng Việt C2, Tiếng Đức A2 </li>
                </ul>
            </div>
    
            <div className="info-card">
              <h3>🚀 Kinh nghiệm</h3>
              <p className="timeline">1/6/2024-30/8/2024<br/>Công ty cổ phần Thí nghiệm Điện 1 - Hà Nội<br/>Hỗ trợ viên IT</p>
              <ul>
                <li>Hỗ trợ đồng nghiệp về các vấn đề máy tính và đảm bảo máy hoạt động bình thường</li>
                <li>Sử dụng phần mềm văn phòng để thu thập dữ liệu và hỗ trợ viết báo cáo cho người hướng dẫn</li>
                <li>Sử dụng phần mềm khác như AdobePhotoshop để sửa lỗi văn bản và ảnh</li>
                <li>Quản lý đám mây chia sẻ để hỗ trợ công việc</li>
              </ul>
            </div>
          </div>
    
          <div className="personal-corner">
            <div className="photo-info-container">
              <div className="corner-photo">
                <img src="../Cornerphoto.jpg" alt="Travel Memories" />
              </div>
              
              <div className="corner-info">
                <h3>Một chút về bản thân tôi - Một người đam mê đi du lịch</h3>
                <p className="subtext-aboutme">
                Tôi tin rằng hành trình hình thành nên tính cách. Qua những chuyến đi, tôi đã học được cách đón nhận nhiều nền văn hóa khác nhau và tìm thấy vẻ đẹp ở mọi ngóc ngách trên thế giới.
                </p>
                
                <div className="travel-stats">
                  <div className="stat-box">
                    <div className="stat-number">10+</div>
                    <p>Quốc gia đã đi qua</p>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number">62+</div>
                    <p>Thành phố đã khám phá</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="map-container">
                <iframe 
                  src="https://beeneverywhere.net/usermap/21522?width=1250&height=550"
                  title="Thang Tran Dac's Travel Map"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
          </div>
        </div>
      ),
      de: (
        <div className="aboutme-sections">
          <div className="professional-info">
            <div className="info-card">
              <h3>💻 Technische Fähigkeiten</h3>
              <ul>
                <li>Frontend: ReactJS, CSS, HTML<br/> UI/UX Design: Figma, AdobePhotoshop </li>
                <li>Backend: NodeJS - ExpressJS, MongoDB, MySQL</li>
                <li>Service: AWS, Google Cloud, Vercel - Github</li>
                <li>Andere: Python (Pandas, NumPy, Tkinter), Microsoft Office(PowerPoint, Word, Excel, PowerBI)</li>
              </ul>
            </div>
    
            <div className="info-card">
              <h3>🎓 Ausbildung</h3>
              <p className="timeline">2023-2027 (Noch studieren)<br/>LAB Fachhochschule - Finnland<br/>Industrielle Informationstechnologie</p>
                <ul>
                  <li>GPA: 4.2/5</li>
                  <li>Sprachen: Englisch C1, Vietnamesisch C2, Deutsch A2 </li>
                </ul>
            </div>
    
            <div className="info-card">
              <h3>🚀 Berufserfahrung</h3>
              <p className="timeline">1/6/2024-30/8/2024<br/>Die elektrische 1 GmbH - Hanoi, Vietnam<br/>IT-Supporter</p>
              <ul>
                <li>Unterstützen Sie Kollegen bei Computerproblemen und sorgen Sie für einen reibungslosen Betrieb</li>
                <li>Verwenden Sie Office-Software, um Daten zu sammeln und beim Schreiben von Berichten für Ausbilder zu helfen</li>
                <li>Verwenden Sie andere Software wie Adobe Photoshop, um Text- und Fotofehler zu korrigieren</li>
                <li>Verwalten Sie die gemeinsam genutzte Cloud, um die Arbeit zu unterstützen</li>
              </ul>
            </div>
          </div>
    
          <div className="personal-corner">
            <div className="photo-info-container">
              <div className="corner-photo">
                <img src="../Cornerphoto.jpg" alt="Travel Memories" />
              </div>
              
              <div className="corner-info">
                <h3>Ein bisschen über mich - Als Reiseliebhaber</h3>
                <p className="subtext-aboutme">
                Ich glaube, dass die Reise den Charakter formt. Durch meine Reisen habe ich gelernt, unterschiedliche Kulturen kennenzulernen und in jedem Winkel der Welt Schönheit zu entdecken.
                </p>
                
                <div className="travel-stats">
                  <div className="stat-box">
                    <div className="stat-number">10+</div>
                    <p>Besuchte Länder</p>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number">62+</div>
                    <p>Erkundete Städte</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="map-container">
                <iframe 
                  src="https://beeneverywhere.net/usermap/21522?width=1250&height=550"
                  title="Thang Tran Dac's Travel Map"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
          </div>
        </div>
      )
    },
    projects: {
      en: (
        <div className="projects-content">
          <div className="project-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
              onClick={() => setActiveFilter('web')}
            >
              Web
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'python' ? 'active' : ''}`}
              onClick={() => setActiveFilter('python')}
            >
              Python
            </button>
          </div>
    
          <div className="project-grid">
            {projectsData
              .filter(project => 
                activeFilter === 'all' || project.category === activeFilter
              )
              .map(project => (
                <div 
                  key={project.id}
                  className={`project-card ${project.category} show`}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-image"
                  />
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-links">
                      {project.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon icon={link.icon} width="24" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ),
      vi: (
        <div className="projects-content">
          <div className="project-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Tất cả
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
              onClick={() => setActiveFilter('web')}
            >
              Web
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'python' ? 'active' : ''}`}
              onClick={() => setActiveFilter('python')}
            >
              Python
            </button>
          </div>
    
          <div className="project-grid">
            {projectsData
              .filter(project => 
                activeFilter === 'all' || project.category === activeFilter
              )
              .map(project => (
                <div 
                  key={project.id}
                  className={`project-card ${project.category} show`}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-image"
                  />
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>
                      {project.description.replace(/React \& Node\.js/g, "React & Node.js")
                        .replace(/React \& Django/g, "React & Django")
                        .replace(/Python/g, "Python")
                        .replace(/Tkinter/g, "Tkinter")
                        .replace(/using/g, "sử dụng")
                        .replace(/A program/g, "Ứng dụng")
                        .replace(/Extracting/g, "Trích xuất")
                        .replace(/displaying it/g, "hiển thị")
                        .replace(/Fullstack/g, "Fullstack")}
                    </p>
                    <div className="project-links">
                      {project.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon icon={link.icon} width="24" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ),
      de: (
        <div className="projects-content">
          <div className="project-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Alle
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
              onClick={() => setActiveFilter('web')}
            >
              Web
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'python' ? 'active' : ''}`}
              onClick={() => setActiveFilter('python')}
            >
              Python
            </button>
          </div>
    
          <div className="project-grid">
            {projectsData
              .filter(project => 
                activeFilter === 'all' || project.category === activeFilter
              )
              .map(project => (
                <div 
                  key={project.id}
                  className={`project-card ${project.category} show`}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-image"
                  />
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-links">
                      {project.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon icon={link.icon} width="24" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="main-screen">
        <section id="about">
          {content.about[language]}
        </section>
        <section id="aboutme">
          <h2>{language === 'en' ? 'About Me' : 
              language === 'vi' ? 'Về tôi' : 
              'Über mich'}</h2>
            {content.aboutme[language]}
        </section>
        <section id="projects">
          <h2>{language === 'en' ? 'Projects' : 
                language === 'vi' ? 'Dự án' : 
                'Projekte'}</h2>
            {content.projects[language]}
        </section>
        <section id="contact">
          <h2>{language === 'en' ? 'Contact' : language === 'vi' ? 'Liên hệ' : 'Kontakt'}</h2>
          <div className="contact-container">
            <div className="contact-info">
              <h3>{contactContent[language].title}</h3>
              <p className="subtext-contact">{contactContent[language].description}</p>
              <div className="social-icons">
                <a href="https://www.linkedin.com/in/tran-thang-2a2557282/" target="_blank" rel="noopener noreferrer">
                  <Icon icon="mdi:linkedin" width="32" />
                </a>
                <a href="https://github.com/tranthangok" target="_blank" rel="noopener noreferrer">
                  <Icon icon="mdi:github" width="32" />
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder={contactContent[language].labels.name}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder={contactContent[language].labels.email}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder={contactContent[language].labels.message}
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="contact-btn" disabled={isLoading}>
                {contactContent[language].labels.submit}
                {isLoading && <Icon icon="eos-icons:loading" className="loader" width="20" />}
              </button>
            </form>
          </div>
        </section>
        <div className="footer-line"></div>
        <div className="footer-copyright">
            <span className="copyright-text">2025 Tran Thang</span>
            <span className="copyright-logo">©</span>
        </div>
    </div>
  );
};

export default MainScreen;