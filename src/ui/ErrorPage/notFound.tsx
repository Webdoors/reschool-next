import Link from "next/link";

const NotFound: React.FC<{}> = () => {
  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2 style={{ color: "#fff" }}>404 Not Found</h2>
            <div className="error-details" style={{ color: "#fff" }}>
              Sorry, an error has occured, Requested page not found!
            </div>
            <div className="error-actions">
              <Link href={"/"} className="btn btn-primary btn-lg">
                <span
                  className="glyphicon glyphicon-home text-white btn-white"
                  style={{ color: "#fff" }}
                />
                დაბრუნება
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
