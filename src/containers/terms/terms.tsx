"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiService } from "../../api/api.service";
import * as EndPoints from "../../api/endPoints";

const TermsContainer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [termsInfo, setTermsInfo] = useState<any>(null);

  useEffect(() => {
    // Fetch TOS information if available from API, otherwise we use placeholder/prop
    // For now, using it as a static-ish page that matches About layout
  }, []);

  return (
    <div
      className="wrapper circle-bg py-4 LIGHTS"
      style={{ marginTop: "50px" }}
    >
      <section className="serv-arch" style={{ borderRadius: "20px" }}>
        <div
          className="container"
          style={{
            background: "#262525",
            borderRadius: "30px",
            marginTop: "80px",
            padding: "4rem 2rem",
            overflow: "hidden",
            color: "#f1f1f1",
            fontFamily: "Helvetica_Neue_LT_GEO_55",
            minHeight: "600px",
          }}
        >
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="title mb-40 text-center">
                <h2
                  className="text-white H2"
                  style={{
                    borderBottom: "solid 1px #aa528b",
                    display: "inline-block",
                    paddingBottom: "10px",
                  }}
                >
                  {t("Terms of Service")}
                </h2>
              </div>

              <div
                className="content"
                style={{
                  lineHeight: "1.8",
                  fontSize: "18px",
                  fontFeatureSettings: "'case' on",
                }}
              >
                {lang === "ka" ? (
                  <>
                    <p className="mb-20">
                      <strong>რე:სქული</strong>
                      <br />
                      <strong>წესები და პირობები</strong>
                      <br />
                      წინამდებარე დებულებები წარმოადგენს შეთანხმებას თქვენსა
                      (მონაწილის კანონიერი წარმომადგენელი) და შპს „რე:სქულს“
                      (ს/კ 405567435) შორის. ვებ-გვერდზე რეგისტრაციით ან
                      მომსახურების მიღებით, თქვენ ადასტურებთ, რომ გაეცანით და
                      ეთანხმებით ქვემოთ მოცემულ პირობებს.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      ძირითადი ტერმინები
                    </h4>
                    <p className="mb-20">
                      <strong>რე:სქული / კომპანია</strong> – არაფორმალური
                      განათლების სივრცე.
                      <br />
                      <strong>მონაწილე</strong> – 9-11 ან 12-15 წლის ასაკის
                      პირი, რომელიც გადის კურსს.
                      <br />
                      <strong>მენტორი</strong> – პრაქტიკოსი სპეციალისტი, რომელიც
                      ფასილიტაციას უწევს სასწავლო პროცესს.
                      <br />
                      <strong>კანონიერი წარმომადგენელი</strong> – მშობელი ან
                      მეურვე, რომელიც ეთანხმება წინამდებარე პირობებს ბავშვის
                      სახელით.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      მომსახურების ტიპები და ღირებულება
                    </h4>
                    <p className="mb-20">
                      <strong>ფასიანი კურსები:</strong> "რე:სქული" სთავაზობს
                      მომხმარებელს სხვადასხვა ტექნოლოგიურ კურსს, რომელთა
                      საფასური და გადახდის გრაფიკი განისაზღვრება კონკრეტული
                      მოდულის მიხედვით.
                      <br />
                      <strong>სოციალური პროექტები:</strong> კომპანია პერიოდულად
                      ახორციელებს უფასო საგანმანათლებლო პროექტებს რეგიონში
                      ტექნოლოგიური განათლების ხელშეწყობის მიზნით. ამ პროექტებზე
                      დაშვება ხდება შერჩევის საფუძველზე, კომპანიის კეთილი ნებით.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      სწავლების ფორმატი და წესები
                    </h4>
                    <p className="mb-20">
                      სწავლება მოიცავს როგორც თეორიულ, ისე პრაქტიკულ მოდულებს
                      (ვებ-პროგრამირება, ხელოვნური ინტელექტი და სხვ.).
                      <br />
                      <strong>აკრძალვები:</strong> მკაცრად იკრძალება ლექციების
                      თვითნებური ჩაწერა (ვიდეო/აუდიო), ფოტოების გადაღება და
                      სასწავლო მასალების მესამე პირებზე გადაცემა.
                      <br />
                      კომპანია იტოვებს უფლებას საჭიროების შემთხვევაში შეცვალოს
                      მენტორი, სასწავლო განრიგი ან ფორმატი, რაც წინასწარ
                      ეცნობება კანონიერ წარმომადგენელს.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      ტექნიკური აღჭურვილობა
                    </h4>
                    <p className="mb-20">
                      სასწავლო პროცესში მონაწილეობისთვის სტუდენტი ვალდებულია
                      უზრუნველყოფილი იყოს პირადი ლეპტოპით და კურსისთვის საჭირო
                      პროგრამული უზრუნველყოფით (რომლის შესახებაც ინფორმაციას
                      წინასწარ მიიღებთ მენტორისგან).
                      <br />
                      იმ შემთხვევაში, თუ კონკრეტული კურსის ფარგლებში კომპანია
                      გამონაკლისის სახით გასცემს ტექნიკას დროებით სარგებლობაში,
                      მასზე სრული მატერიალური პასუხისმგებლობა ეკისრება კანონიერ
                      წარმომადგენელს.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      ინტელექტუალური საკუთრება და პლაგიატი
                    </h4>
                    <p className="mb-20">
                      ნებისმიერი მასალა, რომელიც იქმნება ან გამოიყენება კურსის
                      მსვლელობისას, წარმოადგენს "რე:სქულის" საკუთრებას.
                      <br />
                      კომპანია უფლებამოსილია გამოიყენოს მონაწილის მიერ შექმნილი
                      ნამუშევრები, სახელი, გვარი და გამოსახულება (ფოტო/ვიდეო
                      სასწავლო პროცესიდან) საკუთარ საკომუნიკაციო არხებში
                      მარკეტინგული მიზნებისთვის, რომელზეც წინასწარ აქვს
                      მოპოვებული თანხმობა.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      მონაწილის ვალდებულებები და უფლებამოსილებები
                    </h4>
                    <p className="mb-20">
                      <strong>დასწრება:</strong> კურსის მონაწილე ვალდებულია
                      დაესწროს სასწავლო ცხრილით გათვალისწინებულ ყველა ლექციას.
                      <br />
                      <strong>გადახდის წესი:</strong> კურსის საფასურის გადახდა
                      შესაძლებელია როგორც ერთიანად, ისე ყოველთვიური (ეტაპობრივი)
                      ანგარიშსწორებით, კომპანიასთან შეთანხმებული გრაფიკის
                      შესაბამისად. ასევე შესაძლებელია პარტნიორი ბანკების
                      განვადებით სარგებლობა.
                      <br />
                      <strong>საკუთრების დაცვა:</strong> მონაწილე ვალდებულია
                      გაუფრთხილდეს "რე:სქულის" ფიზიკურ და ინტელექტუალურ
                      საკუთრებას. ფიზიკურ შეხვედრებზე დასწრებისას არ დააზიანოს
                      კომპიუტერული ტექნიკა და აქსესუარები.
                      <br />
                      <strong>მასალების გაზიარება:</strong> მონაწილეს მკაცრად
                      ეკრძალება სასწავლო შეხვედრების ჩანაწერების
                      (ონლაინ/ფიზიკური), სამუშაო მასალების ან სხვა ნებისმიერი
                      შიდა ინფორმაციის გავრცელება, გაზიარება ან გადაცემა მესამე
                      პირებისთვის.
                      <br />
                      <strong>უკუკავშირი:</strong> მონაწილეს/მშობელს უფლება აქვს
                      კურსის განმავლობაში ნებისმიერ დროს მოითხოვოს უკუკავშირი
                      მენტორისგან სტუდენტის პროგრესის შესახებ.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      თანხის უკან დაბრუნების პოლიტიკა
                    </h4>
                    <p className="mb-20">
                      <strong>სატესტო პერიოდი:</strong> "რე:სქული" მონაწილეს
                      აძლევს საშუალებას დაესწროს სატესტო ლექციებს, რათა
                      დარწმუნდეს კურსის შესაბამისობაში.
                      <br />
                      <strong>დაბრუნების პირობა:</strong> თუ სატესტო ლექციებზე
                      დასწრების შემდეგ მონაწილე გადაწყვეტს, რომ არ სურს სწავლის
                      გაგრძელება, მას შეუძლია მოითხოვოს გადახდილი თანხის უკან
                      დაბრუნება ერთი კვირის (7 კალენდარული დღის) ვადაში.
                      აღნიშნული ვადის გასვლის შემდეგ თანხა უკან დაბრუნებას არ
                      ექვემდებარება.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      პერსონალური მონაცემების დამუშავება და უსაფრთხოება
                    </h4>
                    <p className="mb-20">
                      ეს პოლიტიკა განმარტავს, თუ როგორ აგროვებს, იყენებს და
                      იცავს რე:სქული თქვენს და თქვენი შვილის (მონაწილის)
                      პერსონალურ ინფორმაციას. ჩვენ ვმოქმედებთ "პერსონალურ
                      მონაცემთა დაცვის შესახებ" საქართველოს კანონის სრული
                      დაცვით.
                      <br />
                      <strong>1. მონაცემთა დაცვის პრინციპები:</strong> ჩვენ
                      ვიღებთ პასუხისმგებლობას თქვენი პერსონალური მონაცემების
                      უსაფრთხოებასა და დაცვაზე.
                      <br />
                      <strong>2. როგორ გიცავთ კანონი:</strong> თქვენ გაქვთ
                      უფლება მოითხოვოთ თქვენი პირადი მონაცემების გასწორება,
                      განახლება, დაბლოკვა ან წაშლა.
                      <br />
                      <strong>3. ინფორმაციის შეგროვების მიზანი:</strong>{" "}
                      მომსახურების მიწოდება, კომუნიკაცია, განვითარება და
                      ვალდებულებების შესრულება.
                      <br />
                      <strong>
                        4. ფინანსური მონაცემების უსაფრთხოება:
                      </strong>{" "}
                      გადახდისას იყენებთ ბანკის დაცულ გვერდს, ჩვენ თქვენს სრულ
                      საბანკო მონაცემებს არ ვინახავთ.
                      <br />
                      <strong>
                        5. არასრულწლოვანთა მონაცემების დაცვა:
                      </strong>{" "}
                      მონაცემების დამუშავება ხდება მხოლოდ მშობლის/მეურვის
                      თანხმობით, მინიმალური საჭიროების პრინციპით.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      სპეციალური პროგრამები და კურსები (18+)
                    </h4>
                    <p className="mb-20">
                      რე:სქული სთავაზობს მომხმარებლებს დამატებით კურსებს
                      ზრდასრული აუდიტორიისთვის.
                      <br />
                      <strong>სამიზნე აუდიტორია:</strong> განკუთვნილია მხოლოდ
                      18+ ასაკის პირებისთვის.
                      <br />
                      <strong>კურსის ხანგრძლივობა:</strong> სტანდარტული
                      ხანგრძლივობა შეადგენს 3 თვეს.
                      <br />
                      <strong>თანხის უკან დაბრუნება:</strong> მოქმედებს 7-დღიანი
                      რეფანდის პოლიტიკა პირველი ლექციიდან.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mb-20">
                      <strong>RE:SCHOOL</strong>
                      <br />
                      <strong>Terms and Conditions</strong>
                      <br />
                      These provisions constitute an agreement between you (the
                      Participant's legal representative) and ReSchool LLC (I/C
                      405567435). By registering on the website or receiving
                      services, you confirm that you have read and agree to the
                      conditions given below.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">Key Terms</h4>
                    <p className="mb-20">
                      <strong>ReSchool / Company</strong> – Informal education
                      space.
                      <br />
                      <strong>Participant</strong> – A person aged 9-11 or 12-15
                      who undergoes the course.
                      <br />
                      <strong>Mentor</strong> – A practicing specialist who
                      facilitates the learning process.
                      <br />
                      <strong>Legal Representative</strong> – Parent or guardian
                      who agrees to these terms on behalf of the child.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      Types of Services and Cost
                    </h4>
                    <p className="mb-20">
                      <strong>Paid Courses:</strong> "ReSchool" offers customers
                      various technology courses, the fees and payment schedules
                      of which are determined according to the specific module.
                      <br />
                      <strong>Social Projects:</strong> The company periodically
                      implements free educational projects to promote technology
                      education in the region. Access to these projects is based
                      on selection, at the company's discretion and goodwill.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      Teaching Format and Rules
                    </h4>
                    <p className="mb-20">
                      Teaching includes both theoretical and practical modules
                      (web programming, artificial intelligence, etc.).
                      <br />
                      <strong>Prohibitions:</strong> Arbitrary recording
                      (video/audio) of lectures, taking photos, and transferring
                      educational materials to third parties is strictly
                      prohibited.
                      <br />
                      The company reserves the right to change the mentor,
                      teaching schedule, or format if necessary, which will be
                      notified to the legal representative in advance.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      Technical Equipment
                    </h4>
                    <p className="mb-20">
                      To participate in the learning process, the student is
                      obliged to be provided with a personal laptop and software
                      necessary for the course (information about which will be
                      provided in advance by the mentor).
                      <br />
                      In the event that, within the framework of a specific
                      course, the company issues equipment for temporary use as
                      an exception, the legal representative bears full material
                      responsibility for it.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      Intellectual Property and Plagiarism
                    </h4>
                    <p className="mb-20">
                      Any material created or used during the course is the
                      property of "ReSchool".
                      <br />
                      The company is authorized to use the works created by the
                      participant, their name, surname, and image (photo/video
                      from the learning process) in its own communication
                      channels for marketing purposes, for which prior consent
                      has been obtained.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      Participant Obligations and Rights
                    </h4>
                    <p className="mb-20">
                      <strong>Attendance:</strong> The participant is obliged to
                      attend all lectures provided in the teaching schedule.
                      <br />
                      <strong>Payment Policy:</strong> Course fees can be paid
                      in full or through monthly (gradual) payments as per the
                      schedule agreed with the company. Also, installment plans
                      from partner banks are available.
                      <br />
                      <strong>Property Protection:</strong> The participant is
                      obliged to take care of ReSchool's physical and
                      intellectual property. When attending physical meetings,
                      computer equipment and accessories must not be damaged.
                      <br />
                      <strong>Sharing Materials:</strong> Sharing, distributing,
                      or transferring records of teaching sessions
                      (online/physical), working materials, or any other
                      internal information to third parties is strictly
                      prohibited.
                      <br />
                      <strong>Feedback:</strong> The participant/parent has the
                      right to request feedback from the mentor regarding the
                      student's progress at any time during the course.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">Refund Policy</h4>
                    <p className="mb-20">
                      <strong>Testing Period:</strong> "ReSchool" allows the
                      participant to attend test lectures to ensure the course's
                      suitability.
                      <br />
                      <strong>Refund Condition:</strong> If after attending the
                      test lectures the participant decides not to continue,
                      they can request a refund within one week (7 calendar
                      days). After this period has passed, the paid amount is
                      non-refundable.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      Personal Data Processing and Security
                    </h4>
                    <p className="mb-20">
                      This policy explains how ReSchool collects, uses, and
                      protects your and your child's (participant) personal
                      information. We act in full compliance with the Law of
                      Georgia on "Personal Data Protection".
                      <br />
                      <strong>1. Principles of Data Protection:</strong> We take
                      responsibility for your personal data security.
                      <br />
                      <strong>2. How the Law Protects You:</strong> You have the
                      right to request correction, update, blocking, or deletion
                      of your personal data.
                      <br />
                      <strong>
                        3. Purpose of Information Collection:
                      </strong>{" "}
                      Service delivery, communication, development, and
                      fulfillment of obligations.
                      <br />
                      <strong>4. Security of Financial Data:</strong> When
                      paying, you use the bank's secure page; we do not store
                      your full bank details.
                      <br />
                      <strong>5. Protection of Minors' Data:</strong> Processing
                      occurs only with parent/guardian consent, following the
                      principle of data minimization.
                    </p>

                    <h4 className="text-white mb-10 h4 mt-30">
                      Special Programs and Courses (18+)
                    </h4>
                    <p className="mb-20">
                      ReSchool offers consumers additional courses for adult
                      audiences focused on creative skills.
                      <br />
                      <strong>Target Audience:</strong> Intended only for
                      persons aged 18+.
                      <br />
                      <strong>Course Duration:</strong> The standard duration is
                      3 months.
                      <br />
                      <strong>Refund:</strong> A 7-day refund policy applies
                      after the first lecture.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsContainer;
