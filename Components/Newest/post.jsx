import Link from "next/link";
import Image from "next/image";

const post = ({ post }) => {
  return (
    <Link href={`/books/${post._id}`}>
      <div className='col-xs-12 col-sm-6 col-md-2' style={{ cursor: "pointer" }}>
        <Image src={post.image.url} height="300px" width="200px" quality="70" />
        <p>{post.name}</p>
      </div>
    </Link>
  );
};

export default post;
