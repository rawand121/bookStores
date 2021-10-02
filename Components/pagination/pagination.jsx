import Link from "next/link";
const Pagination = (props) => {
  return (
    <div>
      <div className="d-flex">
        <div
          className="p-2 mx-auto"
          style={{ backgroundColor: "#502E2D", color: "#e7a545" }}
        >
          {[...Array(props.pages).keys()].map((page) => {
            return (
              <Link key={page} href={`${props.url}?page=${page + 1}`}>
                <a style={{ cursor: "pointer" }} className="mx-3">
                  {page + 1}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
