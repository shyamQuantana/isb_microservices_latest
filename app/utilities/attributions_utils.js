
const Constants = require('../../config/constants');

const Utils = require('./utils');


function getAuthorNameAndArticleInfo(each_attribution){

    let author_name;
    let other_author_names;
    let article_name;

    if (each_attribution.author_last_name && !!each_attribution.author_last_name) {
        author_name = each_attribution.author_last_name;
    }

    if (each_attribution.author_first_name && !!each_attribution.author_first_name) {
        author_name = author_name + ", " + each_attribution.author_first_name;
    }

    let attribution_text;

    if (author_name &&!!author_name){

        author_name = Utils.upperCase(author_name?.trim());

        attribution_text = author_name;

    }

    if (each_attribution.other_authors && !!each_attribution.other_authors && each_attribution.attribution_type !== Constants.ATTRIBUTION_ISB_ATTRIBUTION_TYPE) {

        other_author_names = each_attribution.other_authors;

        other_author_names = Utils.upperCase(other_author_names);

    }

    if (other_author_names) {

        attribution_text = attribution_text + ", and " + other_author_names;

    }

    return attribution_text;

}


exports.getAttributionTextBasedOnType = (each_attribution) => {

    let attribution_text = "";

    let edition;
    let publication_name;
    let year;
    let page;
    let uploaded;
    let access_date;
    let article_name;
    let journal_title;
    let volume;
    let issue;
    let website;
    let uploader;
    let news_paper_name;
    let dictionary_name;
    let editors;

    if (each_attribution.article_name && !!each_attribution.article_name) {

        article_name = each_attribution.article_name;

        article_name = Utils.upperCase(article_name);
    }

    if (each_attribution.edition && !!each_attribution.edition) {

        edition = each_attribution.edition;
    }

    if (each_attribution.publication_name && !!each_attribution.publication_name) {

        publication_name = each_attribution.publication_name;

        publication_name = Utils.upperCase(publication_name);

    }

    if (each_attribution.year && !!each_attribution.year) {

       year = each_attribution.year;

    }

    if (each_attribution.page && !!each_attribution.page) {

        page = each_attribution.page;

    }

    if (each_attribution.uploaded && !!each_attribution.uploaded) {

       uploaded = each_attribution.uploaded;

    }

    if (each_attribution.access_date && !!each_attribution.access_date) {

        access_date = each_attribution.access_date;

    }

    if (each_attribution.journal_title && !!each_attribution.journal_title) {

        journal_title = each_attribution.journal_title;

    }

    if (each_attribution.volume && !!each_attribution.volume) {

        volume = each_attribution.volume;

    }

    if (each_attribution.issue && !!each_attribution.issue) {

        issue = each_attribution.issue;

    }

    if (each_attribution.website && !!each_attribution.website) {

        website = each_attribution.website;

    }

    if (each_attribution.uploader && !!each_attribution.uploader) {

        uploader = each_attribution.uploader;

    }

    if (each_attribution.news_paper_name && !!each_attribution.news_paper_name) {

        news_paper_name = each_attribution.news_paper_name;

    }

    if (each_attribution.dictionary_name && !!each_attribution.dictionary_name) {

        dictionary_name = each_attribution.dictionary_name;

    }

    if (each_attribution.editors && !!each_attribution.editors) {

        editors = each_attribution.editors;

    }

    let data = [];

    switch (each_attribution.attribution_type){

        case Constants.ATTRIBUTION_BOOK_TYPE:

            attribution_text = getAuthorNameAndArticleInfo(each_attribution);

            data.push({
                text: `${attribution_text}`
            });

            if (!!article_name) {

                data.push({
                    "em": true,
                    text: `. ${article_name}`
                });

            }

            if (!!edition) {

                data.push({
                    text: `. ${edition} ed.,`
                });
            }

            if (!!publication_name) {

                data.push({
                    text: ` ${publication_name}`
                });

            }

            if (!!year) {

                data.push({
                    text: `, ${year}.`
                });

            }

            return data;
        
        case Constants.ATTRIBUTION_JOURNEL_TYPE:

            attribution_text = getAuthorNameAndArticleInfo(each_attribution);

            data.push({
                text: `${attribution_text}`
            });

            if (!!article_name) {

                data.push({
                    text: `. '${article_name}.'`
                });

            }

            if (!!journal_title) {

                data.push({
                    "em": true,
                    text: ` ${journal_title}`
                });

            }

            if (!!volume) {

                data.push({
                    text: `, vol. ${volume}`
                });
            }

            if (!!issue) {

                data.push({
                    text: `, no. ${issue}`
                });
            }

            if (!!year) {

                data.push({
                    text: `, ${year},`
                });

            }

            if (!!page) {

                data.push({
                    text: ` pp. ${page}`
                });

            }

            data.push({
                text: each_attribution.url && !!each_attribution.url ? "," : "."
            });

            return data;

        case Constants.ATTRIBUTION_VIDEO_TYPE:

            attribution_text = getAuthorNameAndArticleInfo(each_attribution);

            data.push({
                text: `${attribution_text}`
            });

            if (!!article_name) {

                data.push({
                    text: `. '${article_name}.'`
                });

            }

            data.push({
                em: true,
                text: `YouTube`
            });

            if (!!uploader){

                data.push({
                    text: `, uploaded by ${uploader}`
                });
            }

            if(!!year){

                data.push({
                    text: `, ${year}`
                });
            }

            data.push({
                text: each_attribution.url && !!each_attribution.url ? "," : "."
            });

            return data;

        case Constants.ATTRIBUTION_WEBPAGE_TYPE:

            attribution_text = getAuthorNameAndArticleInfo(each_attribution);

            data.push({
                text: `${attribution_text}`
            });

            if (!!article_name) {

                data.push({
                    text: `. '${article_name}.'`
                });

            }
            
            if(!!website){

                data.push({
                    "em": true,
                    text: ` ${website},`
                });
            }

            if(!!year){

                data.push({
                    text: ` ${year}`
                });
            }

            data.push({
                text: each_attribution.url && !!each_attribution.url ? "," : "."
            });

            return data;

        case Constants.ATTRIBUTION_NEWSARTICLE_TYPE:
            
            attribution_text = getAuthorNameAndArticleInfo(each_attribution);

            data.push({
                text: `${attribution_text}`
            });

            if (!!article_name) {

                data.push({
                    
                    text: `. '${article_name}.'`
                });

            }

            if (!!news_paper_name) {

                data.push({
                    "em": true,
                    text: ` ${news_paper_name},`
                });
            }

            if (!!year) {

                data.push({
                    text: ` ${year}`
                });
            }

            data.push({
                text: each_attribution.url && !!each_attribution.url ? "," : "."
            });

            return data;

        case Constants.ATTRIBUTION_DICTIONARY_TYPE:

            attribution_text = getAuthorNameAndArticleInfo(each_attribution);

            data.push({
                text: `${attribution_text}`
            });

            if (!!article_name) {

                data.push({
                    text: `. '${article_name}.'`
                });

            }

            if (!!dictionary_name) {

                data.push({
                    "em": true,
                    text: ` ${dictionary_name},`
                });

            }

            if (!!editors) {

                data.push({
                    text: ` edited by ${editors},`
                });

            }

            if (!!edition) {

                data.push({
                    text: ` ${edition} ed.,`
                });
            }

            if (!!year) {

                data.push({
                    text: ` ${year}`
                });

            }

            data.push({
                text: each_attribution.url && !!each_attribution.url ? "," : "."
            });

            return data;

        case Constants.ATTRIBUTION_ISB_ATTRIBUTION_TYPE:

            attribution_text = getAuthorNameAndArticleInfo(each_attribution);

            if (attribution_text && !!attribution_text) {

                data.push({
                    text: `${attribution_text}. `
                });
            }

            if (!!article_name) {

                data.push({
                    text: `'${article_name}.', `
                });

            }

            
            if (!!publication_name) {

                data.push({
                    text: `${publication_name}, `
                });

            }

            if (!!year) {

                data.push({
                    text: `${year}`
                });
            }

            data.push({
                text: !!year ? each_attribution.url && !!each_attribution.url ? "," : "." : ""
            });

            return data;
            

        default:

            attribution_text = getAuthorNameAndArticleInfo(each_attribution);

            if (attribution_text && !!attribution_text) {

                data.push({
                    text: `${attribution_text}. `
                });
            }

            if (!!article_name) {

                data.push({
                    text: `'${article_name}.', `
                });

            }

            if (!!publication_name) {

                data.push({
                    text: `${publication_name}, `
                });

            }

            if (!!year) {

                data.push({
                    text: `${year}`
                });
            }

            data.push({
                text: !!year ? each_attribution.url && !!each_attribution.url ? "," : "." : ""
            });    

            return data;

    }

}