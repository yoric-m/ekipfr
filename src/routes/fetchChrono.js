export async function fetchChrono() {
    const jsonUrl = "https://dwh.lequipe.fr/api/edito/chrono?path=/Tennis/&context=page&page=1&itemsPerPage=80&platform=desktop&version=1.4/";
  
    let imgEntete = "";
    let body = [];
  
    let response = await fetch(jsonUrl);
    let data = await response.json();

// Debug object in the console
// let str = JSON.stringify(data);
// str = JSON.stringify(data, null, 4);
// console.log(data);

    data.content.feed.items.map((e) => {
      if (e.__type === "chrono_widget") {
       let breadcrumb = e.content.breadcrumb.reduce(
          (accumulator, currentValue) => accumulator + currentValue.text + ", ",
          "",
        ).slice(0, -2);
        const publicationDate = Date.parse(e.content.publication_date);
        const nowDate = Date.parse(Date());
        const datePublish = new Date(publicationDate);
        const dateNow = new Date(nowDate);
        let outputDate = "";
        if (dateNow.getDay() === datePublish.getDay() && dateNow.getMonth() === datePublish.getMonth()) {
          outputDate = ("0" + datePublish.getHours()).slice(-2) + ':' + ("0" + datePublish.getMinutes()).slice(-2);
        } else {
          const formatter = new Intl. DateTimeFormat('fr', { month: 'short' });
          outputDate = ("0" + datePublish.getDate()).slice(-2) + " " + formatter.format(datePublish).slice(0,-1);
        }
        let dt = new Date(publicationDate);
        let chronoClass = "chrono_item";
        if (e.content.highlighted) {
          chronoClass = "chrono_item_important";
        }
        body.push({
            id: e.content.id,
            title: e.content.title,
            header: breadcrumb,
            date: outputDate,
            premium: e.content.is_paywalled,
            chronoClass: chronoClass,
          });
        console.log(e.link.web);
      }
    });
    return {
      body,
    };
  }
  
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
                  <figcaption style="font-size: 0.5em;text-align:center;"><i>${caption}</i></figcaption>
                  </figure>
                  `;
  };
  
