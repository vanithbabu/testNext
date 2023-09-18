import Link from "next/link";
import { footerLinks } from "@/constants";

const Footer = () => (
  <footer className="text-white bg-blue font-FuturaPTBook text-2xl">
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex justify-between py-4 flex-col md:flex-row ">
        {footerLinks.map((item, index) => (
          <div className="flex flex-col" key={"row" + index}>
            {item.title !== "" ? (
              <h2 className="py-2 text-center">{item.title}</h2>
            ) : null}

            {item.links.map((link, index) => {
              if (link.same_row) {
                return (
                  <div
                    className="flex items-center justify-center"
                    key={"same_row" + index}
                  >
                    {link.data.map((rowlink, index) => {
                      return (
                        <div className="flex" key={"loop" + index}>
                          <Link
                            target={rowlink.external_link ? "_blank" : ""}
                            href={rowlink.url}
                            className="text-center py-2 underline"
                          >
                            {rowlink.title}
                          </Link>{" "}
                          {index !== link.data.length - 1 ? (
                            <span className="mx-2 py-2"> | </span>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              }

              return (
                <Link
                  key={"link" + index}
                  target={link.external_link ? "_blank" : ""}
                  href={link.url}
                  className="text-center py-2 underline"
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
