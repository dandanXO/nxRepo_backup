import { BackNavigation } from "../../../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import { environment } from "../../../../../../environments/environment";
import React from "react";


export const PrivacyAgreementPage = () => {

  const { onClickToIndex } = usePageNavigate();

  return (
    <div className='w-full flex justify-center text-sm lg:text-lg text-white'>
      <div className='w-full px-[21px] sm:px-8 lg:px-0 lg:w-[70%]'>
        <BackNavigation onClick={()=>onClickToIndex()} />

        <div className='text-lg lg:text-2xl font-medium pb-5 sm:pb-8 lg:pb-10'>Privacy Policy and Personal Data Protection</div>

        <div>1. Introduction:</div>
        <div>
          At {environment.platformName}, we aim to provide the best possible experience to
          Users. Therefore, in order for us to provide an increasingly
          personalized service for you, our Users, we need to understand your
          gaming and interaction habits. However, the privacy and security of
          your personal data has always been of paramount concern to us. That
          is why we wish to explain, in a transparent and detailed fashion,
          how we collect, store, share and use personal data from Users, as
          well as detail the choices and control options you shall have at
          your disposal when and if you decide to share said personal data.
          This is the main purpose of this Privacy and Personal Data
          Protection Policy ("Policy").
        </div>

        <div>2. About this Policy</div>
        <div>
          This Policy determines the key details of the relationship between
          Users personal data and {environment.platformName}. The Policy applies to all {environment.platformName} services as well as any associated services (hereinafter
          referred to as " {environment.platformName} services"). The terms governing the
          use of the {environment.platformName} services by Users are defined in our Terms
          and Conditions of Use.
        </div>
        <div>
          From time to time, we may develop new services or offer additional
          services. If the introduction of these new or additional services
          results in any changes in how we collect and handle Users personal
          data, we shall provide more information and additional terms or
          policies. Unless otherwise stated, whenever we introduce new or
          additional services, these shall be subject to this Policy.
        </div>
        <div>The purposes of this Policy are:</div>
        <div>
          Ensure that Users understand exactly what personal data we collect
          about them, the reasons why we collect and use such data and with
          whom we share these;
        </div>
        <div>
          Explain how we use the personal data Users share with us, in order
          to provide you with a great experience whenever you use {environment.platformName}
          Slots services; and
        </div>
        <div>
          Explain to Users their respective rights and choices regarding the
          personal data we collect and process, as well as how we protect
          their privacy.
        </div>
        <div>
          We expect that this Policy helps Users understand our commitment to
          their privacy. For information on how to contact us in case you have
          any questions on concerns, please refer to section 14 "Contacting
          us" below.
        </div>
        <div>
          On the other hand, if a User does not agree with the content of this
          Policy, we hereby declare that users are free to decide whether to
          use and/or continue using {environment.platformName} services.
        </div>
        <div>
          User rights and preferences: providing you with choices and control
          options:
        </div>
        <div>
          If you do not already know, there are European Union and Brazilian
          laws, the General Data Protection Regulation (or "GDPR") and the
          Brazilian General Personal Data Protection Law (or "LGDP"),
          respectively, which grant certain rights to individuals in relation
          to their personal data. As provided for under the applicable laws
          and except for any limitations found therein, the rights granted to
          individuals are as follows:
        </div>
        <div>
          Right to access - the right to be informed and request access to the
          personal data we process about the User;
        </div>
        <div>
          Right to rectification - the right to request that we change or
          update the User's personal data whenever these are incorrect or
          incomplete;
        </div>
        <div>
          Right to information erasure - the right to request us to delete
          your personal data from our database;
        </div>
        <div>
          Right to restriction - the right to request that we, either
          temporarily or permanently, stop processing all or some of your
          personal data;
        </div>
        <div>
          Right to objection - the right to, at any given time, object to the
          processing of your personal data for reasons related to your
          particular situation; the right to object to your personal data
          being processed for direct marketing purposes;
        </div>
        <div>
          Right to data portability - the right to request a copy of your
          personal data in electronic form and the right to transmit such
          personal data for use in third-party services;
        </div>
        <div>
          Right to not be subject to automated decisions - the right not to be
          subject to a decision based solely on an automated decision with
          respect to personal data, including profiling, in cases where the
          decision may have a legal effect for you or have an equally
          significant effect.
        </div>
        <div>
          In order for Users to be able to easily exercise these rights and
          record their preferences regarding how {environment.platformName} uses their
          personal data, we provide the following options through our Privacy
          settings, located on the "MY PROFILE" page:
        </div>
        <div>
          1.Control some of the categories of personal data we handle;
        </div>
        <div>2.Manage your publicly available personal data;</div>
        <div>
          If we send you electronic marketing messages based on your consent
          or as otherwise permitted by applicable law, Users may at any time,
          respectively, withdraw their authorization or state their objection
          ("refusal") without any additional charges. To do so, all they have
          to do is use the link found in the electronic message itself to
          unsubscribe from the mailing list.
        </div>
        <div>
          In case of questions regarding their privacy, rights, or how to
          exercise such rights, Users should contact our data protection
          officer by writing an email message to info@startechgame.com We
          shall issue a reply within a reasonable period of time after
          verifying the identity of the User in question.
        </div>
        <div>
          If you are unhappy with how we are using your personal data, you may
          also file a written complaint with the Data Protection Authority in
          your local jurisdiction.
        </div>
        <div>4. How do we collect personal data from Users?</div>
        <div>We collect personal data from Users in the following ways:</div>
        <div>
          When Users registers with a {environment.platformName} service: upon
          registration, we collect certain personal data, such as, but not
          limited to: email address, full name, sex, country, IP address,
          access device and its identifier so that they can use the {environment.platformName}
          Slots service in question.
        </div>
        <div>
          Through the use of a {environment.platformName} service: when User use a {environment.platformName}
          Slots service, we collect personal data about their use of the {environment.platformName} service in question, such as games played, history of
          plays, list of devices used to access the services, nicknames that
          accessed the services from a single device, variation of ranking
          positions, variation in the balance of virtual credits for each
          User, IP addresses used for access, among other information deemed
          necessary to achieve our corporate goals. From time to time, Users
          may also provide us with additional personal data or grant us
          permission to collect additional personal data in order to provide
          you with more features or functionalities, for instance. The
          personal data collected also allows us to mitigate risks and/or
          frauds regarding users and against the services.
        </div>
        <div>
          Through third parties - we may also receive personal data in
          connection with Users and their activities from third parties,
          including advertisers and partners we work with, so that we may
          provide {environment.platformName} services (please refer to Section 7 "Sharing
          Users personal data" below). We shall use these personal data if the
          User in question authorized the relevant third party, or {environment.platformName}
          Slots, to share such data, or if {environment.platformName} has a legitimate
          interest in using these personal data to provide a {environment.platformName}
          service to the User.
        </div>
        <div>
          As described below, we do not collect photographs, exact geographic
          locations obtained from mobile devices, voice data or contact lists
          from Users without their previous authorization. You can always
          change your mind and withdraw your consent at any time.
        </div>
        <div>5. What kind of personal data about Users do we collect?</div>
        <div>
          In the tables below, we organize the categories of Users personal
          data that we collect and use:
        </div>
        <div>Personal data categories Category description</div>
        <div>Account registration information</div>
        <div>
          These are the personal data provided by Users or data that we
          collect so that Users may use a {environment.platformName} service. These include
          name, surname, ID, email address, date of birth, sex and physical
          address of Users.
        </div>
        <div>
          Some personal data requested are mandatory for Users to create their
          account. Users also have the option of providing us with some
          additional personal data so that their experience is more
          personalized.
        </div>
        <div>
          The specific personal data we collect depends on how the {environment.platformName}
          Slots services are used by Users and whether they use a third party
          service (as defined in the Terms and Conditions of Use), such as
          Facebook, to use {environment.platformName} services. If a User uses a third
          party service to create an account, we shall receive personal data
          through such third party service, but only if the User has
          authorized the third party service in question to share their
          personal data with us.
        </div>
        <div>Usage data</div>
        <div>
          These are the personal data collected about Users when they use a
          {environment.platformName} service, which may include:
        </div>
        <div>Information about the kind of {environment.platformName} service plan.</div>
        <div>
          Information on User interactions with the {environment.platformName} services,
          such as games played, history of plays, list of devices used to
          access the services, history of nicknames used to access the
          services from a single device, variation of ranking positions and
          variation in the balance of virtual credits for each User, in
          addition to their interactions with other {environment.platformName} Users.
        </div>
        <div>
          These may also include information about the use of third-party
          applications and any advertisements you receive.
        </div>
        <div>
          User content (as defined in the Terms and Conditions of Use of the
          services) they publish on {environment.platformName}, including the messages they
          send and/or receive through {environment.platformName} and their interactions
          with the {environment.platformName} Customer Support team.
        </div>
        <div>
          Technical data, which may include URL information, cookie data, IP
          address of the User, the devices used to access {environment.platformName}
          services, exclusive device identifications, device attributes and
          type of network connection (Wi-Fi, 3G, LTE, Bluetooth etc.), as well
          as network provider, network and device performance, browser,
          language, information that allows for the management of digital
          rights, operating system and {environment.platformName} application version.
        </div>
        <div>
          Personal data collected with your authorization that allow us to
          provide you with additional functions or functionalities:
        </div>
        <div>Personal data categories Category description</div>
        <div>Optional mobile data</div>
        <div>
          In addition to the mobile data we collect to provide Users with the
          {environment.platformName} services (described above), Users also have the option
          to authorize us to collect additional personal data from their
          mobile devices so that we can provide them with features and
          functionalities that shall enhance their experience regarding {environment.platformName} services.
        </div>
        <div>
          We shall not collect any of the personal data listed below without
          first obtaining User consent:
        </div>
        <div>
          Users photographs - If a User gives us permission to access their
          photographs or their camera, we shall only collect the images they
          specifically choose to share with us and the metadata related to
          such images, such as file type and image size. We shall never scan
          or import a Users photo library or camera roll;
        </div>
        <div>
          Exact geographic location obtained from Users mobile devices - If
          Users authorizes us to access specific geographic locations, this
          shall allow us to use Users GPS or Bluetooth in order to provide {environment.platformName} service functionalities that require exact geographic
          location. Please note that this does not include Users IP address.
          We use Users IP address to determine non-exact geographic location,
          such as in which country they are located, in order to comply with
          the purpose of our Terms and Conditions of Use;
        </div>
        <div>
          Exact geographic location obtained from Users mobile devices - If
          Users authorizes us to access specific geographic locations, this
          shall allow us to use Users GPS or Bluetooth in order to provide {environment.platformName} service functionalities that require exact geographic
          location. Please note that this does not include Users IP address.
          We use Users IP address to determine non-exact geographic location,
          such as in which country they are located, in order to comply with
          the purpose of our Terms and Conditions of Use;
        </div>
        <div>
          Users contact list - If a User gives us authorization to access
          their contact list, we can consult the list of contacts stored on
          their device in order to help such User to find friends who use {environment.platformName}
        </div>
        <div>Payment information</div>
        <div>
          We may collect this personal data if a User registers for a Trial
          Period or makes any purchase through a {environment.platformName} service (as
          defined in the Terms and Conditions of Use). The actual personal
          data collected may vary depending on the payment method, but may
          include information such as:
        </div>
        <div>Name;</div>
        <div>Date of birth</div>
        <div>ID</div>
        <div>
          Type of debit or credit card, expiration date and certain card
          number digits;
        </div>
        <div>Physical address;</div>
        <div>Phone number;</div>
        <div>Users transaction history information;</div>
        <div>
          If a User chooses to pay by invoice, we shall provide their personal
          data to our payment processors so that they may carry out credit
          checks and send invoices to the User.
        </div>
        <div>Special offers, contests and sweepstakes</div>
        <div>
          These personal data are used to enable Users to register and
          participate in special offers. Specific personal data collected may
          vary, depending on the special offer.
        </div>
        <div>Marketing data</div>
        <div>
          These personal data are used to allow {environment.platformName} and its
          partners/service providers to send marketing communications to
          Users:
        </div>
        <div>by email</div>
        <div>while using the {environment.platformName} service</div>
        <div>directly from a third party.</div>
        <div>6. For what purposes do we use personal data from Users?</div>
        <div>
          When Users use or interact with {environment.platformName} services, we use
          various technologies to process the personal data collected about
          Users for various reasons. In the table below, we set out the
          reasons why we process Users personal data, the associated legal
          grounds on which our actions are based and which allow us to legally
          process Users personal data and the categories of personal data
          (identified in section 5 "What kind of personal data about Users do
          we collect?") used for these purposes:
        </div>
        <div>
          Indication of the reason why {environment.platformName} handles Users personal
          data ("processing purposes") Legal grounds for processing purposes
          Categories of personal data used by {environment.platformName} for processing
          purposes
        </div>
        <div>
          In order to provide, customize and improve User experience with
          regard to {environment.platformName} services as well as other services and
          products provided by {environment.platformName}, such as when providing content
          that is personalized, individualized or adjusted according to User
          location, as well as recommendations, features and advertisements
          inside or outside {environment.platformName} (including third-party products and
          services).
        </div>
        <div>Celebration of an agreement</div>
        <div>Legitimate interests</div>
        <div>Account registration data</div>
        <div>Service use data</div>
        <div>Optional mobile data, if necessary</div>
        <div>
          In order to ensure the integrity of the rankings for the modalities
          offered, the {environment.platformName} entertainment environment and mitigate
          actions related to fraud and collusion between Users.
        </div>
        <div>Celebration of an agreement</div>
        <div>Legitimate interests</div>
        <div>Account registration data</div>
        <div>Service use data</div>
        <div>
          In order to understand how Users access and use {environment.platformName}
          services, aiming at ensuring the technical functionality of the {environment.platformName} services, develop new products and services and analyze
          the use of {environment.platformName} services by Users, including its
          interaction with applications, advertisements, products and services
          that are made available, associated with, or offered by way of {environment.platformName}
        </div>
        <div>Celebration of an agreement</div>
        <div>Legitimate interests</div>
        <div>Account registration data</div>
        <div>Service use data</div>
        <div>
          In order to establish communication with Users for purposes related
          to the {environment.platformName} services.
        </div>
        <div>Celebration of an agreement</div>
        <div>Legitimate interests</div>
        <div>Account registration data</div>
        <div>Service use data</div>
        <div>
          In order to process Users payments and prevent or identify frauds,
          including fraudulent payments and fraudulent use of the {environment.platformName}
          Slots services.
        </div>
        <div>Celebration of an agreement</div>
        <div>Fulfillment of legal obligations</div>
        <div>Legitimate interests</div>
        <div>Account registration data</div>
        <div>Service use data</div>
        <div>Payment information</div>
        <div>
          In order to establish communication with Users, either directly or
          through our partners, for the following purposes:
        </div>
        <div>marketing</div>
        <div>surveys</div>
        <div>participation in contests and special offers</div>
        <div>
          through emails, notifications or other messages, in accordance with
          any authorizations that may have been transmitted by Users to {environment.platformName} (through the Privacy settings, for instance).
        </div>
        <div>Authorization</div>
        <div>Legitimate interests</div>
        <div>Contest and sweepstakes data</div>
        <div>Marketing data</div>
        <div>
          In order to provide Users with functionalities, information,
          advertisements or content based on Users exact location.
        </div>
        <div>Authorization</div>
        <div>Optional mobile data</div>
        <div>
          We use anonymized and aggregated information for purposes that
          include testing our IT systems, researching, analyzing data,
          creating marketing and promotion models, improving {environment.platformName}
          services and developing new features and functionalities for {environment.platformName}
          Slots services.
        </div>
        <div>7. Sharing Users personal data:</div>
        <div>
          We list below the categories of the recipients of personal data that
          have been collected or generated through the use of the {environment.platformName}
          Slots service by Users, as applicable:
        </div>
        <div>Publicly available information</div>
        <div>
          The following personal data from Users shall always be publicly
          available on the {environment.platformName} service: Users nickname, profile
          picture, game performance information and account creation date,
          among other personal data that can be verified on the Users Profile
          page.
        </div>
        <div>Personal data that Users may choose to share</div>
        <div>
          The following personal data shall only be shared with the recipient
          categories indicated in the table below if:
        </div>
        <div>
          Users choose a specific functionality of the {environment.platformName} service
          for which the sharing of personal data is necessary for the
          appropriate use of the functionality of the {environment.platformName} service;
        </div>
        <div>
          Users explicitly authorize the sharing of personal data, for
          instance, by selecting the appropriate setting in the Privacy
          settings of the {environment.platformName} service.
        </div>
        <div>Recipient categories Reason for sharing</div>
        <div>
          Third-party application used by Users to log into {environment.platformName} When
          accessing their {environment.platformName} account from a third-party
          application, such as social media applications, {environment.platformName} may
          share their data so that Users are linked in both registers, that
          is, the {environment.platformName} network and any third party;
        </div>
        <div>
          If a User associates a third-party application using their {environment.platformName}
          Slots account credentials, then such third-party application may
          have access to certain service use data, stored content and
          activities. Before connecting to the Third Party Application, the
          User shall receive a notice stating that their personal data shall
          be shared with/may be accessed by such Third Party Application.
        </div>
        <div>
          Community When a User joins the {environment.platformName} Community, they shall
          use the same nickname as the one from their account. Such User
          nickname shall be publicly displayed to anyone who also accesses the
          {environment.platformName} Community area, along with any questions, comments and
          other content that they can post or make public through the {environment.platformName}
          Slots service's Privacy settings.
        </div>
        <div>
          More details on publicly available information and on what Users
          share with third parties are available in Section 3, "User rights
          and preferences: providing you with choices and control options", of
          this Policy and the Privacy settings.
        </div>
        <div>Information we may share</div>
        <div>Recipient categories Reason for sharing</div>
        <div>Service providers and other parties</div>
        <div>
          We use technical service providers that operate the technical
          infrastructure we need to provide the Slots Big Boss Services, in
          particular providers that host, store, manage and maintain the {environment.platformName} application, its content and the data we process.
        </div>
        <div>
          We use technical service providers to help us communicate with Users
          as described in Section 6 of this Policy.
        </div>
        <div>
          We use marketing and advertising partners to show more personalized
          content or to help us understand how Users use the {environment.platformName}
          services and provide them with better service. We may also share
          personal data with certain marketing and advertising partners in
          order to send Users promotional communications about {environment.platformName}
        </div>
        <div>
          Additionally, we use payment partners; however, in this case we do
          not store or share credit card data or other payment methods, and
          all data with regard to payments that are entered on our pages are
          encrypted and sent to the respective payment APIs.
        </div>
        <div>{environment.platformName} Partners</div>
        <div>
          Should Users access the {environment.platformName} service through an offer that
          they have received or acquired through a third party, such as their
          mobile network operator, we shall share personal data with such
          third party about their use of the {environment.platformName} service, such as if
          and to what extent they used the offer, if they activated a Slots
          Big Boss account or whether they have actively used the {environment.platformName}
          Slots service.
        </div>
        <div>
          We also share Users personal data in a pseudonymous format with
          marketing partners that help us in promotional efforts and with
          advertisers that allow us to offer a free service.
        </div>
        <div>Compliance with the law and data protection authorities</div>
        <div>
          We shall share Users personal data when we believe, in good faith,
          that this is necessary in order to fulfill a legal obligation under
          the applicable law, or to respond to a valid legal proceeding, such
          as a search warrant, a court order or a subpoena.
        </div>
        <div>
          We shall also share Users personal data if we believe, in good
          faith, this is necessary for our legitimate interest, or the
          interest of third parties, as well as in terms of matters of
          national security, law enforcement, litigation, criminal
          investigation, protecting anyone's safety, or to prevent death or
          imminent physical harm, provided that we take into account the fact
          that such interest does not prevail over the interests or
          fundamental rights and freedoms of Users that require the protection
          of Users personal data.
        </div>
        <div>Buyers of our business.</div>
        <div>
          We shall share Users personal data when we sell or negotiate the
          sale of our business to a buyer or potential buyer.
        </div>
        <div>
          In this case, {environment.platformName} shall continue to ensure the
          confidentiality of Users personal data and we shall notify them
          before their personal data is transferred to the buyer or is subject
          to a different Privacy Policy.
        </div>
        <div>8. Data conservation and erasure:</div>
        <div>
          We retain Users personal data for as long as necessary in order to
          provide the {environment.platformName} service and for legitimate and essential
          business purposes, such as to maintain the performance of the {environment.platformName} service, make business decisions about functionalities and
          offers based on data, fulfill our legal obligations, and resolve
          disputes. We retain some of the personal data obtained from Users
          while they remain Users of the {environment.platformName} service. For instance,
          we keep User history and their purchase history, profile, ranking
          positions, credit history and other account information.
        </div>
        <div>
          At the Users request, we shall erase or anonymize their personal
          data so that they do not allow for User identification, unless it is
          legally permitted or mandatory to keep certain personal data during
          processing, including situations such as the following:
        </div>
        <div>
          If there is an unresolved issue with a Users account, such as an
          outstanding credit to their account or an unresolved complaint or
          dispute, we shall retain all the necessary personal data until the
          issue is resolved;
        </div>
        <div>
          If we are required to retain personal data in order to comply with
          our legal, tax, auditing and accounting obligations, we shall retain
          all the necessary personal data for the period required by
          applicable law;
        </div>
        <div>
          Whenever deemed necessary for our legitimate business interests,
          such as fraud prevention or to maintain the security of our Users.
        </div>
        <div>9. Transfer to other countries:</div>
        <div>
          {environment.platformName} shares some personal data obtained from Users globally to facilitate the activities outlined in this Policy. This data is shared with various partners and service providers, including third parties located outside the Users' country of residence.
        </div>
        <div>
          {environment.platformName} may also subcontract processing services or share the personal data obtained from Users with third parties situated in countries different from their country of residence. Consequently, the personal data collected from Users may be subject to privacy laws distinct from those applicable in their country of residence.
        </div>
        <div>
          For example, personal data gathered in the European Union and Switzerland may be transferred and processed by third parties located in a country outside the European Union and Switzerland. In such instances, {environment.platformName} will ensure that the transfer of Users' personal data complies with the relevant privacy laws. Additionally, {environment.platformName} will guarantee the adoption of appropriate contractual, technical, and organizational measures, including the use of standard contractual clauses approved by the European Commission.
        </div>
        <div>
          Further details about the security measures employed to safeguard Users' personal data can be found in Section 11, "Keeping Users' personal data safe."
        </div>
        <div>10. URLs:</div>
        <div>
          We may exhibit third-party advertisements and other content such as
          URLs redirecting to third-party websites. We cannot control, nor may
          we be held responsible for, the privacy practices and content by
          third parties. If a User clicks on an advertisement or a third-party
          URL, they should be aware that they are exiting the Slots Big Boss
          service and that any personal data they provide shall not be covered
          by this Policy. Users should read the respective privacy policies in
          order to find out how they collect and process their personal data.
        </div>
        <div>11. Keeping Users personal data safe:</div>
        <div>
          We are committed to protecting the personal data of our Users.
        </div>
        <div>
          We implement technical and organizational measures to help protect
          the security of the personal data obtained from our Users, namely:
          creation of nicknames, encryption and access and retention policies
          to prevent unauthorized access and unnecessary retention of personal
          data in our systems. However, Users must be made aware of the fact
          that no system is completely secure.
        </div>
        <div>
          A password protects User accounts, and that is why we encourage Users
          to use a unique and robust password, to limit access to computers, browsers
          and other devices deemed secure (trusted), and to log out after using the
          {environment.platformName} service.
        </div>
        <div>12. Children:</div>
        <div>Children Between Age of 13 and 18</div>
        <div>
          We recommend that minors over the age of 13 ask their parents for
          permission before sending any information about themselves to anyone
          over the Internet.
        </div>
        <div>
          1.User shall use his/her account only for non-commercial
          entertainment purposes.
        </div>
        <div>
          2.User shall not use the service for any other purpose, such as
          collecting chips from various accounts or by any other means.
        </div>
        <div>
          3.User shall not use his/her account for any illegal activity.
        </div>
        <div>
          4.User shall not use his/her account to transmit repetitive messages
          (spam), junk e-mail, advertise and solicit.
        </div>
        <div>
          5.User shall not use profanity or language that discriminates or
          maliciously targets another individual in any way. This includes
          his/her profile picture.
        </div>
        <div>
          6.User shall not use his/her account to cheat or hack the game by
          any means. Losing on purpose as a means of transferring chips can be
          tracked easily, and this behavior will have his/her chips taken and
          banned.
        </div>
        <div>
          7.User shall not sublicense, lease, trade, gift, sell or otherwise
          transfer his/her account or associated virtual items partly or fully
          to anyone without written permission from {environment.platformName}
        </div>
        <div>
          8.User shall not buy or get chips, bonus and any other virtual items
          from any unauthorized source such as links from unknown sources or
          people promising free chips, etc.
        </div>
        <div>
          9.User are allowed one account per social network to use the
          service. In addition, User cannot use multiple accounts to try to
          accumulate free chips. This behavior is easily detectible and will
          result in all your accounts being suspended and/or banned.
        </div>
        <div>
          10.User shall not use scripts and manual processes to abusively
          accumulate free chips.
        </div>
        <div>
          11.User shall not use any of the services or create an account or
          use an account if Users have been removed or banned from using the
          service.
        </div>
        <div>
          12.User shall not use any of the {environment.platformName} game or service if
          you do not agree with the terms of service and User license to use
          the service shall immediately terminate.
        </div>
        <div>
          13.User have no right to carry out actions including but not limited
          to:
        </div>
        <div>
          Deleting all the information and contents related the copyright on
          {environment.platformName} software and other copies;Performing reverse
          engineering, reverse assembly, reverse compilation, etc., to the
          game of the {environment.platformName}, regardless of any purpose of plagiarizing
          or changing the game software of {environment.platformName}; For information
          related to the software of game of the {environment.platformName} (without the
          written consent of {environment.platformName}) you cannot (without authorization
          including but not limited to) use, copy, modify, link, reprint,
          assemble, release, publish, set up a mirror site, or use {environment.platformName}
          Slots game for these purposes without authorization to develop
          derivative products, works or services related to the software.
        </div>
        <div>13. Changes to this Privacy Policy:</div>
        <div>From time to time, we may make changes to this Policy.</div>
        <div>
          When we make material changes to this Policy, we shall draw up a
          notable and appropriate communication, depending on the
          circumstances, by exhibiting, for instance, a notable communication
          on the {environment.platformName} service or by sending an email message to
          Users. We may send a communication to Users in advance.
        </div>
        <div>
          Therefore, it is essential that Users read all communications
          carefully.
        </div>
        <div>14. Contacting us:</div>
        <div>
          Thank you for reading our Privacy Policy. If you have any questions
          regarding this Policy, please contact our Data Protection Officer by
          writing a message to info@startechgame.com. We shall issue a reply
          within a reasonable period of time after verifying the identity of
          the User in question.
        </div>
        <div>
          {environment.platformName} is responsible for the processing data for the
          purposes of the personal data obtained from Users processed under
          this Policy.
        </div>

      </div>
    </div>
  )
}
