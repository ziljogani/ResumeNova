import { FiPlus, FiTrash2 } from "react-icons/fi";

const Experience = ({ data, updateData }) => {

  const addExperience = () => {

    updateData([
      ...data,
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ]);

  };

  const removeExperience = (index) => {

    updateData(
      data.filter((_, i) => i !== index)
    );

  };

  const handleChange = (index, field, value) => {

    const updated = [...data];

    updated[index][field] = value;

    updateData(updated);

  };

  return (

    <div className="form-section">

      <div className="form-heading">

        <h2>Experience</h2>

        <p>
          Add your work experience and internships.
        </p>

      </div>

      {data.map((experience, index) => (

        <div className="item-card" key={index}>

          <button
            className="remove-item"
            onClick={() =>
              removeExperience(index)
            }
          >
            <FiTrash2 />
          </button>

          <div className="form-grid">

            <div className="form-group">

              <label>Job Title</label>

              <input
                placeholder="Frontend Developer Intern"
                value={experience.jobTitle}
                onChange={(e) =>
                  handleChange(
                    index,
                    "jobTitle",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>Company</label>

              <input
                placeholder="Company Name"
                value={experience.company}
                onChange={(e) =>
                  handleChange(
                    index,
                    "company",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>Start Date</label>

              <input
                placeholder="June 2025"
                value={experience.startDate}
                onChange={(e) =>
                  handleChange(
                    index,
                    "startDate",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>End Date</label>

              <input
                placeholder="August 2025"
                value={experience.endDate}
                onChange={(e) =>
                  handleChange(
                    index,
                    "endDate",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group full-width">

              <label>Responsibilities</label>

              <textarea
                placeholder="Describe your responsibilities and achievements..."
                value={experience.description}
                onChange={(e) =>
                  handleChange(
                    index,
                    "description",
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        </div>

      ))}

      <button
        className="add-button"
        onClick={addExperience}
      >

        <FiPlus />

        Add Experience

      </button>

    </div>

  );
};

export default Experience;