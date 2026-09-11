const PersonalInfo = ({ data, updateData }) => {

  const handleChange = (e) => {

    updateData(
      e.target.name,
      e.target.value
    );

  };

  return (

    <div className="form-section">

      <div className="form-heading">

        <h2>Personal Information</h2>

        <p>
          Add your basic information so recruiters
          can contact you.
        </p>

      </div>


      <div className="form-grid">

        <div className="form-group">

          <label>Full Name</label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={data.fullName}
            onChange={handleChange}
          />

        </div>


        <div className="form-group">

          <label>Professional Title</label>

          <input
            type="text"
            name="role"
            placeholder="Full Stack Developer"
            value={data.role}
            onChange={handleChange}
          />

        </div>


        <div className="form-group">

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={data.email}
            onChange={handleChange}
          />

        </div>


        <div className="form-group">

          <label>Phone</label>

          <input
            type="text"
            name="phone"
            placeholder="+91 98765 43210"
            value={data.phone}
            onChange={handleChange}
          />

        </div>


        <div className="form-group">

          <label>Location</label>

          <input
            type="text"
            name="location"
            placeholder="Surat, Gujarat"
            value={data.location}
            onChange={handleChange}
          />

        </div>


        <div className="form-group">

          <label>LinkedIn</label>

          <input
            type="text"
            name="linkedin"
            placeholder="linkedin.com/in/username"
            value={data.linkedin}
            onChange={handleChange}
          />

        </div>


        <div className="form-group">

          <label>GitHub</label>

          <input
            type="text"
            name="github"
            placeholder="github.com/username"
            value={data.github}
            onChange={handleChange}
          />

        </div>


        <div className="form-group">

          <label>Portfolio</label>

          <input
            type="text"
            name="portfolio"
            placeholder="yourportfolio.com"
            value={data.portfolio}
            onChange={handleChange}
          />

        </div>

      </div>

    </div>

  );

};

export default PersonalInfo;