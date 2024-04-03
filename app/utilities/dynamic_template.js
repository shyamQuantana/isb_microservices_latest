const Constants = require('../../config/constants');
function getDynamicEmailTemplate(student_name,email,password,set_password_link,gather_town_url,role_type) {

  let role_based_programs = '';


  if(role_type == Constants.WELCOME_ROLE_TEMPLATE1){
    role_based_programs = `<ul>
    <li style="line-height: 19.6px;"><span style="font-size: 14px; line-height: 19.6px;"><strong>critical Thinking</strong></span></li>
    <li style="line-height: 19.6px;"><strong>Leading Teams</strong></li>
    <li style="line-height: 19.6px;"><strong>Leading Change</strong></li>
  </ul>`
  }else if(role_type == Constants.WELCOME_ROLE_TEMPLATE2){
    role_based_programs = `<ul>
    <li style="line-height: 19.6px;"><span style="font-size: 14px; line-height: 19.6px;"><strong>Statistics for Managers</strong></span></li>
    <li style="line-height: 19.6px;"><strong>Art of Storytelling</strong></li>
    <li style="line-height: 19.6px;"><strong>Art of Networking</strong></li>
  </ul>`
  }else if(role_type == Constants.WELCOME_ROLE_TEMPLATE3){
    role_based_programs = `<ul>
    <li style="line-height: 19.6px;"><span style="font-size: 14px; line-height: 19.6px;"><strong>Managing High-Performance Teams</strong></span></li>
    <li style="line-height: 19.6px;"><strong>Project Management</strong></li>
    <li style="line-height: 19.6px;"><strong>Data Visualisation and Communication</strong></li>
  </ul>`
  }
  var welcome_email_html = `<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:14px 20px 0px;font-family:'Open Sans',sans-serif;" align="left">

          <div style="font-family: 'Open Sans',sans-serif; font-size: 14px; font-weight: 400; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
            <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">Dear ${student_name},</span></p>
            <p style="line-height: 140%;"> </p>
            <p style="line-height: 140%;">We are thrilled to welcome you to ISB Online! ISB Online brings world-class, research-backed business education through a state-of-the-art, immersive, digital learning experience that empowers you with essential business
              acumen to excel in today’s dynamic workplace.​</p>
            <p style="line-height: 140%;"> </p>
            <p style="line-height: 140%;">Our team has created a unique and engaging learning experience. To access your free course on Critical Thinking, please log in to ISB Online using the link below:</p>
            <p style="line-height: 140%;"> </p>
            <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;"><a rel="noopener" href=${set_password_link} target="_blank" style="color: #000000;"><span style="text-decoration: underline; line-height: 19.6px;">Click here to login</span></a>
            </span>
           </p>
            </p>
            <p style="line-height: 140%;"> </p>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:14px 20px 0px;font-family:'Open Sans',sans-serif;" align="left">

          <div style="font-family: 'Open Sans',sans-serif; font-size: 14px; font-weight: 400; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
            <p style="line-height: 140%;"><strong>About Critical Thinking:​</strong></p>
            <p style="line-height: 140%;"><br />This course will introduce you to canonical decision models and emphasise how despite the availability and knowledge of data, our understanding of the world, intuition and, ultimately, judgment are significantly influenced
              by schemas or abstract representations of events and cognitive biases.​</p>
            <p style="line-height: 140%;"><br />This course is taught by Professor Deepa Mani, Deputy Dean, Executive Education and Digital Learning Professor of Information Systems. <strong>The course will be available to you from May 11, 2023 to Jun 15, 2023 only</strong>.</p>
          </div>

        </td>
      </tr>
    </tbody>

  </table><br/>`;

  var sla_email_html = `<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:14px 20px 0px;font-family:'Open Sans',sans-serif;" align="left">

        <div style="font-family: 'Open Sans',sans-serif; font-size: 14px; font-weight: 400; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
          <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">Dear ${student_name},</span></p>
          <p style="line-height: 140%;"> </p>
          <p style="line-height: 140%;">We hope you are geared up for your Social Learning Activity (SLA) for the Group Decision Making Module in the Critical Thinking Course. Your SLA is scheduled on May 20, 2023 at 07:00 PM. Here’s what you need to do before you start your activity:</p>
          <p style="line-height: 140%;"> </p>
          <p style="line-height: 140%;">- Ensure that you read all the instructions and answer the questions in the “Get Started” section of the SLA.</p>
          <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">- Please go through the <span style="text-decoration: underline; line-height: 19.6px; color: #3598db;"><span style="line-height: 19.6px;"><a rel="noopener" href="https://www.bbc.co.uk/bitesize/guides/z342mp3/revision/1" target="_blank" style="color: #3598db; text-decoration: underline;">link</a></span></span>
          in this email since it is a prerequisite for your activity.</span></p>
          <p style="line-height: 140%;"><span style="font-size: 12px; line-height: 16.8px; color: #000000;"><em>Shared for educational purposes only. Source: <a rel="noopener" href="http://www.bbc.co.uk/" target="_blank"><span style="line-height: 19.6px; color: #3598db;">www.bbc.co.uk</span></a></em></span></p>
          <p style="line-height: 140%;"> </p>
          <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">Please come to the activity prepared and to be respectful of your peers’ time and have a more engaging discussion.</span></p>
          <p style="line-height: 140%;"> </p>
          <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">Link to access: ISB Town – <span style="line-height: 19.6px;"><a rel="noopener" href=${gather_town_url} target="_blank" style="color: #3598db; text-decoration: underline;">CLICK HERE</a></span> to join​</span></p>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:14px 20px 0px;font-family:'Open Sans',sans-serif;" align="left">

        <div style="font-family: 'Open Sans',sans-serif; font-size: 14px; font-weight: 400; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
            <p style="line-height: 140%;"> </p>
            <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">If you have any technical difficulties, please do not hesitate to contact us on <span style="font-size: 14px; line-height: 0px;"><a style="text-decoration: underline;; color: #3598db; padding:0px;" href="mailto:isbonline@isb.edu"><span style="color: #3598db; line-height: 0px;">isbonline&zwj;@is&zwj;b.e&zwj;du</span></a></span>. Our team will reach out to you.</span></p>
            <p style="line-height: 140%;"> </p>
        </div>

      </td>
    </tr>
  </tbody>
</table>`;

  var weekly_plan_template_body = `<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:14px 20px 0px;font-family:'Open Sans',sans-serif;" align="left">

                              <div style="font-family: 'Open Sans',sans-serif; font-size: 14px; font-weight: 400; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
                                <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">Dear ${student_name},</span></p>
                                <p style="line-height: 140%;">&nbsp;</p>
                                <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">Congratulations on completing the first course on  Critical Thinking! Before you begin your next course, take a minute to pause and reflect on your learnings. Please fill in this feedback form to mark the completion of your course: <span style="text-decoration: underline; line-height: 19.6px;"><a target="_blank" href="https://forms.office.com/pages/responsepage.aspx?id=Q-TapKs4SkCzMZ0dM3_PN3kRPzWJrp5JvN341kj-7S5UQ1FTTEUxNEU5UFcyOUpHN0hTS0lZMUxCSi4u" rel="noopener"><span style="line-height: 19.6px;"><span style="color: #3598db; line-height: 19.6px; text-decoration: underline;">click here</span></span></a></span>.​</span>
                                </p>
                                <p style="line-height: 140%;">&nbsp;</p>
                                <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">We hope you are ready for another week of exciting learning!</span></p>
                                <p style="line-height: 140%;">&nbsp;</p>
                                <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">This week you will be starting your next course – Art of Storytelling. Here is an overview of the modules and activities scheduled:</span></p>
                                <ul>
                                  <li style="line-height: 19.6px;"><span style="color: #000000; line-height: 19.6px;">Module 1 – How to Tell Stories Effectively will be released on May 21, 2023. A social learning activity for this module is scheduled on May 27, 2023, at 07:00 PM.</span></li>
                                  <li style="line-height: 19.6px;"><span style="color: #000000; line-height: 19.6px;">Module 2 – Learning from Case Studies will be released on May 29, 2023. A social learning activity for this module is scheduled on Jun 03, 2023, at 07:00 PM.</span></li>
                                </ul>
                                <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">We encourage you to complete these modules and activities on time to stay on track with your learning goals. Additionally, timely completion of the modules and activities will earn you bonus points.</span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:14px 20px 0px;font-family:'Open Sans',sans-serif;" align="left">

                              <div style="font-family: 'Open Sans',sans-serif; font-size: 14px; font-weight: 400; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
                                <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">We look forward to seeing your progress this week and are excited to support you throughout your learning journey. If you have any questions or concerns, please do not hesitate to reach out to us on <span style="text-decoration: underline; line-height: 19.6px; color: #3598db;"><a style="text-decoration: underline;; color: #3598db; padding:0px;" href="mailto:isbonline@isb.edu"><span style="color: #3598db; line-height: 0px;">isbonline&zwj@is&zwj;b.e&zwj;du</span></a></span></span></p>
                                <p style="line-height: 140%;"> </p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>
`;

 var welcome_role_based_email = `<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
 <tbody>
   <tr>
     <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:14px 20px 0px;font-family:'Open Sans',sans-serif;" align="left">

       <div style="font-family: 'Open Sans',sans-serif; font-size: 14px; font-weight: 400; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
         <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">Respected  ${student_name},</span></p>
         <p style="line-height: 140%;"> </p>
         <p style="line-height: 140%;">We are pleased to extend a warm welcome to you and provide access to a curated set of courses from the Indian School of Business. These courses are based on multiple learning experiences and diverse subject matters.</p>
         <p style="line-height: 140%;"> </p>
         <p style="line-height: 140%;">You will have access to the courses from May 9, 2023, to May 20, 2023. At the end of your access period, we will share a survey form to gather your feedback on the courses and the learning journey. On successful completion
           of the course content, an ISB certificate will be awarded.</p>
         <p style="line-height: 140%;"> </p>
         <p style="line-height: 140%;">Here is the list of courses that you will have access to:</p>
         ${role_based_programs}
         <p style="line-height: 140%;">Please follow the link below to log in and access your courses: </p>
         <p style="line-height: 140%;"> </p>
         <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">To get started, please log in using the credentials provided to you in this email.</span></p>
         <p style="line-height: 140%;"> </p>
         <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;"><strong>Email:</strong> <span style="line-height: 19.6px;"><a href="mailto:${email}" style="color: #000000;">${email}</a></span></span>
         </p>
         <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;"><strong>Password:</strong> <span style="line-height: 19.6px;">${password}</span></span>
         <p style="line-height: 140%;"> </p>
         <p style="line-height: 140%;"><span style="color: #000000; line-height: 19.6px;">If you have any technical difficulties in accessing your courses, please reach out to us on <span style="font-size: 14px; line-height: 0px;"><a style="text-decoration:underline; color: #000000; padding:0px;"  href="mailto:isbonline@isb.edu "><span style="color: #000000; line-height: 0px;">isbonline@isb.edu </span></a></span>.</span></p>
         <p style="line-height: 140%;"> </p>
         <p style="line-height: 140%;">Thank you for considering the Indian School of Business. We look forward to your valuable feedback.</p>
       </div>

     </td>
   </tr>
 </tbody>
</table><br/>`


  let email_obj = {
    [Constants.WELCOME_EMAIL_TEMPLATE_BODY]    : welcome_email_html,
    [Constants.SLA_EMAIL_TEMPLATE_BODY]        : sla_email_html,
    [Constants.WEEKLY_PLAN_EMAIL_TEMPLATE_BODY]: weekly_plan_template_body,
    [Constants.WELCOME_ROLE_TEMPLATE_BODY]:welcome_role_based_email
  };

  return email_obj;
}
exports.getDynamicEmailTemplate = getDynamicEmailTemplate;
