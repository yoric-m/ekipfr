export async function fetchData(id) {
  const jsonUrl = "https://dwh.lequipe.fr/api/v2/efr/news/";

  let commUrl = "";
  let title = "";
  let imgEntete = "";
  let body = "";
  let comments = [];

  const urlToFetch = jsonUrl + id;
  let response = await fetch(urlToFetch);
  let data = await response.json();

  commUrl = data.comment_count_url.replace("count", "limits/500/lasts/0/best");
  comments = await goGetComments(id, commUrl);
  data.items.map((e) => {
    if (e.layout === "article_feature") {
      title = e.objet.long_title;
      if (e.objet.media.url) {
        imgEntete = getImageTag(e.objet.media.url, e.objet.media.legende ?? "");
      }
    }
    if (e.layout === "article_body") {
      e.objet.paragraphs
        .filter((z) => z.__type != "article_paragraph_pub")
        .filter((p) => p.title != "lire aussi")
        .map((p) => {
          if (p.title) {
            body += "<h3>" + p.title + "</h3>";
          }
          if (
            p.__type === "article_paragraph_media" &&
            p.media.__type !== "base_video"
          ) {
            console.log(p.media);
            body += getImageTag(p.media.url, p.media.legende ?? "");
          } else if (p.__type !== "article_paragraph_signature" && p.content) {
            body += "<p>" + p.content + "</p><br/>";
            if (p.layout === "chapo") {
              body += imgEntete;
            }
          }
        });
    }
  });
  return {
    title,
    body,
    comments,
  };
}

const goGetComments = async (url, commUrl) => {
  let arrayComments = [];
  let response = await fetch(commUrl);
  let data = await response.json();

  data.comments.map((comm) => {
    let serieCom = [comm.text];
    if (comm.comments) {
      comm.comments.map((scom) => serieCom.push("> " + scom.text));
    }
    arrayComments = [...arrayComments, serieCom];
  });
  return arrayComments;
};

const getImageTag = (url, caption) => {
  let src = url;
  const regImg = /^(http.+[0-9]{6,})\//i;
  const regImh = /quality\}(\/.+)$/i;
  const returnMatches = src.match(regImg);
  const returnMatchet = src.match(regImh);
  if (!returnMatches || !returnMatchet) return "";
  src = returnMatches[1] + "/203:6,1793:1066-828-552-75" + returnMatchet[1];
  return `<figure>
				<img style="display:block;margin: 0 auto;" src="${src}" />
				<figcaption style="font-size: 1em;font-weight:100; color: #ccc; text-align:center;"><i>${caption}</i></figcaption>
				</figure>
				`;
};
