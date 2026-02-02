

const SignUpContainer  = () =>{
   return   <div className="main-content">
      {/* ==================== Start about ==================== */}
      <section className="section-padding">
         <div className="container">
            <div className="row">
               <div className="col-lg-8 valign md-mb50">
                  <div className="mb-50">
                     {'{'}% if status == false %{'}'}
                     {'{'}% for error in result%{'}'}
                     <div className="alert alert-danger">{'{'}{'{'} error {'}'}{'}'}</div>
                     {'{'}% endfor %{'}'}
                     {'{'}% endif %{'}'}

                     <h3 className="fw-600  ls1 mb-30 color-font">შენც შეგიძლია</h3>
                     <p>ისწავლე ყველაზე მოთხოვნადი პროფესიები, მნიშვნელოვნად გაზარდე საკუთარი შემოსავლები და შეიტანე შენი წვლილი გლობარულ-ციფრულ რევოლუაციაში.</p>
                  </div>
               </div>
               <div className="col-lg-4 img">
                  <form action="{{ path('user_signup') }}" method="post" id="signin_form">
                     <input type="hidden" name="_csrf_token" defaultValue="{{ csrf_token('authenticate') }}" />
                     <div className="form-group">
                        <label htmlFor="full_name">სახელი გვარი</label>
                        <input type="text" className="form-control" id="full_name" name="full_name" />
                     </div>
                     <div className="form-group">
                        <label htmlFor="pnumber">პირადი ნომერი</label>
                        <input type="text" className="form-control" id="pnumber" name="pnumber" />
                     </div>
                     <div className="form-group">
                        <label>სქესი</label>
                        <div className="row">
                           <div className="col-md-6">
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" defaultValue={1} defaultChecked={true} name="list_user_gender_id" id="list_user_gender_id1" />
                                 <label className="form-check-label" htmlFor="list_user_gender_id1">მამრობითი</label>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" defaultValue={2} name="list_user_gender_id" id="list_user_gender_id2" />
                                 <label className="form-check-label" htmlFor="list_user_gender_id2">მდედრობითი</label>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="form-group">
                        <label htmlFor="bday">დაბადების თარიღი</label>
                        <input type="date" className="form-control" min="1920-01-01" max="2015-01-01" id="bday" name="bday" />
                     </div>
                     <div className="form-group">
                        <label htmlFor="phone">ტელეფონის ნომერი</label>
                        <input type="tel" className="form-control" id="phone" name="phone" placeholder={"591415795"} />
                     </div>
                     <div className="form-group">
                        <label htmlFor="email">ელ. ფოსტა</label>
                        <input type="email" className="form-control" id="email" name="email" />
                     </div>
                     <div className="form-group">
                        <label htmlFor="password">პაროლი</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="********" />
                     </div>
                     <div className="form-group">
                        <label htmlFor="repeat_password">გაიმეორეთ პაროლი</label>
                        <input type="password" className="form-control" id="repeat_password" name="repeat_password" placeholder="********" />
                     </div>
                     <div className="form-group">
                        <button type="submit" name="signup" className="butn bord curve mt-30 w-100">რეგისტრაცია</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </section>
      {/* ==================== End about ==================== */}

   </div>
}

export default  SignUpContainer