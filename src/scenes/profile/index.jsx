import "./profile.css";

export default function Profile() {
  return (
    <div className="profile-container">
      <h2 className="page-title">Profile</h2>
      <div className="card-profile">
        <div className="profile-left">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="avatar"
            className="avatar"
          />
          <div className="profile-info">
            <h3>Musharof Chowdhury</h3>
            <p>Team Manager | Arizona, United States</p>
          </div>

          <button className="edit-btn">✎ Edit</button>

        </div>

        <div className="info-grid">
          <div className="info-item">
            <span>Nama Pengguna</span>
            <strong>Musharof</strong>
          </div>

          <div className="info-item">
            <span>Bio</span>
            <strong>Team Manager</strong>
          </div>

          <div className="info-item">
            <span>Username</span>
            <strong>Chowdhury</strong>
          </div>

          <div className="info-item">
            <span>Password</span>
            <strong>*****</strong>
          </div>

        </div>
      </div>
    </div>
  );
}
