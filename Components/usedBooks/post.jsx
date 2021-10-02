import Link from "next/link";
import Image from "next/image";

const post = (props) => {
  return (
    <div className="col-sm-6 col-md-3">
      <Link href={`/used-books/${props.book._id}`}>
        <div style={{ cursor: "pointer" }}>
          <Image
            src={props.book.image.url}
            height="300px"
            width="200px"
            quality="70"
          />
          <p>{props.book.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default post;
