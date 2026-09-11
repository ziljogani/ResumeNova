import { FiPlus, FiTrash2 } from "react-icons/fi";

const Projects = ({ data, updateData }) => {

  const addProject = () => {

    updateData([
      ...data,
      {
        name: "",
        technologies: "",
        link: "",
        description: ""
      }
    ]);

  };

  const removeProject = (index) => {

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

        <h2>Projects</h2>

        <p>
          Showcase your best academic and personal projects.
        </p>

      </div>

      {data.map((project, index) => (

        <div className="item-card" key={index}>

          <button
            className="remove-item"
            onClick={() => removeProject(index)}
          >
            <FiTrash2 />
          </button>

          <div className="form-grid">

            <div className="form-group">

              <label>Project Name</label>

              <input
                placeholder="AI Resume Builder"
                value={project.name}
                onChange={(e) =>
                  handleChange(
                    index,
                    "name",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>Technologies</label>

              <input
                placeholder="React, Node.js, MongoDB"
                value={project.technologies}
                onChange={(e) =>
                  handleChange(
                    index,
                    "technologies",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group full-width">

              <label>Project Link</label>

              <input
                placeholder="https://github.com/username/project"
                value={project.link}
                onChange={(e) =>
                  handleChange(
                    index,
                    "link",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group full-width">

              <label>Description</label>

              <textarea
                placeholder="Describe your project..."
                value={project.description}
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
        onClick={addProject}
      >

        <FiPlus />

        Add Project

      </button>

    </div>

  );
};

export default Projects;