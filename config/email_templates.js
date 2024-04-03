function getUserEnrolmentEmailTemplate(student_name, learning_track_name, start_date) {

    var html = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 520px) {
        .u-row {
          width: 500px !important;
        }
        .u-row .u-col {
          vertical-align: top;
        }
        .u-row .u-col-50 {
          width: 250px !important;
        }
        .u-row .u-col-100 {
          width: 500px !important;
        }
      }
      
      @media (max-width: 520px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: 100% !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col>div {
          margin: 0 auto;
        }
      }
      
      body {
        margin: 0;
        padding: 0;
      }
      
      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }
      
      p {
        margin: 0;
      }
      
      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }
      
      * {
        line-height: inherit;
      }
      
      a[x-apple-data-detectors='true'] {
        color: inherit !important;
        text-decoration: none !important;
      }
      
      @media (min-width: 0px) {
        .hide-default__display-block {
          display: block !important;
          mso-hide: unset !important;
        }
      }
      
      @media (max-width: 480px) {
        .hide-mobile {
          max-height: 0px;
          overflow: hidden;
          display: none !important;
        }
      }
      
      @media (min-width: 481px) {
        .hide-desktop {
          max-height: 0px;
          overflow: hidden;
          display: none !important;
        }
      }
      
      table,
      td {
        color: #000000;
      }
      
      #u_body a {
        color: #3598db;
        text-decoration: none;
      }
      
      @media (max-width: 480px) {
        #u_content_text_23 .v-line-height {
          line-height: 100% !important;
        }
        #u_content_text_24 .v-line-height {
          line-height: 100% !important;
        }
        #u_content_text_5 .v-container-padding-padding {
          padding: 12px 8px 0px !important;
        }
      }
    </style>
  
  
  
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" type="text/css">
    <!--<![endif]-->
  
  </head>
  
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
  
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
  
                                      <img align="center" border="0" src="https://assets.unlayer.com/projects/152816/1681238387010-Email.jpg" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 500px;"
                                        width="500" />
  
                                    </td>
                                  </tr>
                                </table>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #512a44;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #512a44;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:2px;font-family:'Open Sans',sans-serif;" align="left">
  
                                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="0%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                  <tbody>
                                    <tr style="vertical-align: top">
                                      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                        <span>&#160;</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container hide-mobile" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="250" style="background-color: #512a44;width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #512a44;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Open Sans',sans-serif;" align="left">
  
                                <div class="v-line-height" style="line-height: 110%; text-align: center; word-wrap: break-word;">
                                  <p style="line-height: 110%;"> </p>
                                  <p style="line-height: 110%;"><span style="color: #ffffff; line-height: 15.4px;"><strong>Welcome to ISB Online!</strong></span></p>
                                  <p style="line-height: 110%;"> </p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]><td align="center" width="249" style="background-color: #512a44;width: 249px;padding: 0px;border-top: 0px solid transparent;border-left: 1px solid #CCC;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #512a44;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 1px solid #CCC;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--<![endif]-->
  
                        <table class="hide-mobile" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px 0px;font-family:'Open Sans',sans-serif;" align="left">
  
                                <div class="v-line-height" style="line-height: 110%; text-align: left; word-wrap: break-word;">
                                  <p style="line-height: 110%;"><span style="color: #ffffff; line-height: 15.4px;"><strong>Certificate Programme in ${learning_track_name}</strong></span></p>
                                  <p style="line-height: 110%;"><span style="color: #ffffff; line-height: 15.4px;"><strong><sup>Starts ${start_date}</sup><br /></strong></span></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
            <!--[if !mso]><!-->
            <div class="u-row-container hide-default__display-block hide-desktop" style="display: none;mso-hide: all;padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="250" style="background-color: #512a44;width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #512a44;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--<![endif]-->
  
                        <table id="u_content_text_23" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Open Sans',sans-serif;" align="left">
  
                                <div class="v-line-height" style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="line-height: 100%;"><span style="color: #ffffff; line-height: 14px;"><strong>Welcome to ISB Online!</strong></span></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]><td align="center" width="250" style="background-color: #512a44;width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #512a44;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--<![endif]-->
  
                        <table id="u_content_text_24" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Open Sans',sans-serif;" align="left">
  
                                <div class="v-line-height" style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="line-height: 100%;"><span style="color: #ffffff; line-height: 14px;"><strong>Certificate Programme in ${learning_track_name}</strong></span></p>
                                  <p style="line-height: 100%;"><span style="color: #ffffff; line-height: 14px;"><strong><sup>Starts ${start_date}</sup><br /></strong></span></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
            <!--<![endif]-->
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #512a44;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #512a44;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:2px;font-family:'Open Sans',sans-serif;" align="left">
  
                                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="0%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                  <tbody>
                                    <tr style="vertical-align: top">
                                      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                        <span>&#160;</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #ffffff;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:14px 20px 0px;font-family:'Open Sans',sans-serif;" align="left">
  
                                <div class="v-line-height" style="font-family: 'Open Sans',sans-serif; font-size: 14px; font-weight: 400; color: #000000; line-height: 160%; text-align: left; word-wrap: break-word;">
                                  <p style="line-height: 140%;"><span style="color: #000000; line-height: 22.4px;">Dear ${student_name},</span></p>
                                  <p style="line-height: 100%;"> </p>
                                  <p style="line-height: 140%;">We are happy to share that your admission has been successful for the Certificate Programme in ${learning_track_name}. You will receive the link to login to your course 48 hours before the start date. All the materials
                                    required will be provided through the course platform.</p>
                                  <p style="line-height: 100%;"> </p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 20px;font-family:'Open Sans',sans-serif;" align="left">
  
                                <div class="v-line-height" style="font-family: 'Open Sans',sans-serif; font-size: 14px; color: #000000; line-height: 160%; text-align: left; word-wrap: break-word;">
                                  <p style="line-height: 140%; font-size: 14px;"><span style="color: #000000; line-height: 22.4px;">If you require any help in your application process, please reach out to us on: isbonline@isb.edu</span></p>
                                  <p style="line-height: 100%;"> </p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 20px 14px;font-family:'Open Sans',sans-serif;" align="left">
  
                                <div class="v-line-height" style="font-family: 'Open Sans',sans-serif; font-size: 14px; color: #000000; line-height: 100%; text-align: left; word-wrap: break-word;">
                                  <p style="line-height: 100%; font-size: 14px;"><strong><span style="color: #000000; line-height: 14px;">Let's get learning!</span></strong></p>
                                  <p style="line-height: 100%; font-size: 14px;"><strong><span style="color: #000000; line-height: 14px;">ISB Online team</span></strong></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #000000;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #000000;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #000000;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #000000;height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table id="u_content_text_5" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:12px 0px 0px;font-family:'Open Sans',sans-serif;" align="left">
  
                                <div class="v-line-height" style="font-family: 'Open Sans',sans-serif; font-size: 0px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="line-height: 35%;"> </p>
                                  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 0px;"><strong>ISB Online<br /></strong><a style="text-decoration:none; padding:0px;" href="https://online.isb.edu"><span style="color: #FFFFFF; line-height: 0px;">online&zwj;.i&zwj;sb&zwj;.ed&zwj;u</span></a><span style="font-size: 14px; line-height: 0px;"><a style="text-decoration:none; padding:0px;" href="mailto:isbonline@isb.edu"><span style="color: #FFFFFF; line-height: 0px;"> | isbonline&zwj;@is&zwj;b.e&zwj;du</span></a><br/></span></p>
                                  <p style="line-height: 25%;"> </p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #000000;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #000000;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #000000;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #000000;height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 0px 14px;font-family:'Open Sans',sans-serif;" align="left">
  
                                <div align="center">
                                  <div style="display: table; max-width:184px;">
                                    <!--[if (mso)|(IE)]><table width="184" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:184px;"><tr><![endif]-->
  
  
                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                            <a href="https://www.facebook.com/ISBeduOnline" title="Facebook" target="_blank">
                                              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
  
                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                            <a href="https://www.linkedin.com/company/isbonline/" title="LinkedIn" target="_blank">
                                              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/linkedin.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
  
                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                            <a href="https://www.youtube.com/@isb.online" title="YouTube" target="_blank">
                                              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/youtube.png" alt="YouTube" title="YouTube" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
  
                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                            <a href="https://twitter.com/online_isb" title="Twitter" target="_blank">
                                              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/twitter.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
  
                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                            <a href="https://www.instagram.com/isbeduonline/" title="Instagram" target="_blank">
                                              <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
  
  
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #ffffff;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:6px;font-family:'Open Sans',sans-serif;" align="left">
  
                                <div class="v-line-height" style="font-family: 'Open Sans',sans-serif; font-size: 0px; color: #000000; line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 10px; line-height: 0px; color: #000000;">Copyright © Indian School of Business. All rights reserved.</span></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
  
  </html>`;
  
    return html;
  }

  exports.getUserEnrolmentEmailTemplate = getUserEnrolmentEmailTemplate;