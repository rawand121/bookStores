import Link from "next/link";
import Image from "next/image";

const post = (props) => {
  return (
    <div className="col-xs-12 col-sm-5 col-md-3 eachBook">
      <Link href={`/books/${props.book._id}`}>
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
