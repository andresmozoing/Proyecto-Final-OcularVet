"use strict";(self.webpackChunkauthApp=self.webpackChunkauthApp||[]).push([[830],{6830:(R,c,s)=>{s.r(c),s.d(c,{AuthModule:()=>x});var m=s(6895),o=s(433),l=s(5495),e=s(1571);let f=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-main"]],decls:4,vars:0,consts:[[1,"limiter"],[1,"container-login100",2,"background-image","url('../../../../assets/images/bg-01.jpg')"],[1,"wrap-login100","p-l-55","p-r-55","p-t-65","p-b-54"]],template:function(r,n){1&r&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._UZ(3,"router-outlet"),e.qZA()()())},dependencies:[l.lC],encapsulation:2}),t})();var Z=s(5226),u=s.n(Z),p=s(6518);function h(t,i){1&t&&(e.TgZ(0,"span",39),e._uU(1," Ingrese por favor un email v\xe1lido. "),e.qZA())}function _(t,i){1&t&&(e.TgZ(0,"span",39),e._uU(1," La contrase\xf1a debe tener una longitud minima de 6 caracteres. "),e.qZA())}function b(t,i){1&t&&(e.TgZ(0,"span",49),e._uU(1," El nombre es un campo requerido. "),e.qZA())}function T(t,i){1&t&&(e.TgZ(0,"span",49),e._uU(1," El apellido es un campo requerido. "),e.qZA())}function A(t,i){1&t&&(e.TgZ(0,"span",49),e._uU(1," Por favor ingrese un N\xb0 DNI valido. "),e.qZA())}function q(t,i){1&t&&(e.TgZ(0,"span",49),e._uU(1," Por favor, ingrese un email v\xe1lido "),e.qZA())}function w(t,i){1&t&&(e.TgZ(0,"span",49),e._uU(1," La contrase\xf1a debe tener una longitud minima de 6 caracteres. "),e.qZA())}function y(t,i){1&t&&(e.TgZ(0,"span",49),e._uU(1," Este campo es requerido, y las contrase\xf1as deben coincidir. "),e.qZA())}function U(t,i){1&t&&(e.TgZ(0,"span",49),e._uU(1," Este campo es requerido. "),e.qZA())}const N=[{path:"",component:f,children:[{path:"login",component:(()=>{class t{constructor(r,n,a){this.fb=r,this.router=n,this.authService=a,this.miFormulario=this.fb.group({email:["test1@test.com",[o.kI.required,o.kI.email]],password:["123456",[o.kI.required,o.kI.minLength(6)]]}),this.mostrarOcultarPassword=!1}login(){const{email:r,password:n}=this.miFormulario.value;this.authService.login(r,n).subscribe(a=>{!0===a.ok?(console.log("El usuariuo es ",a.isAdmin),this.router.navigateByUrl(a.isAdmin?"/ocularVet/admin/configAdmin":"/ocularVet/alumno/ejercicio")):(console.log("resp es ",a),u().fire("Error",a,"error"))})}campoNoValido(r){return this.miFormulario.get(r)?.invalid&&this.miFormulario.get(r)?.touched}mostrarOcultarPasswordFunction(){console.log("holsss"),this.mostrarOcultarPassword=!this.mostrarOcultarPassword}}return t.\u0275fac=function(r){return new(r||t)(e.Y36(o.QS),e.Y36(l.F0),e.Y36(p.e))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-login"]],decls:57,vars:5,consts:[["lang","en"],["charset","utf-8"],["content","width=device-width, initial-scale=1.0","name","viewport"],["content","","name","description"],["content","","name","keywords"],["href","../../../../assets/img/favicon.png","rel","icon"],["href","../../../../assets/img/apple-touch-icon.png","rel","apple-touch-icon"],["href","https://fonts.gstatic.com","rel","preconnect"],["href","https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i","rel","stylesheet"],[1,"animate__animated","animate__backInDown"],[1,"container"],[1,"section","register","min-vh-100","d-flex","flex-column","align-items-center","justify-content-center","py-4"],[1,"row","justify-content-center"],[1,"col-lg-4","col-md-6","d-flex","flex-column","align-items-center","justify-content-center"],[1,"card","mb-3"],[1,"card-header"],[1,"d-flex","justify-content-center"],["href","index.html",1,"logo","d-flex","align-items-center","w-auto"],["src","../../../../assets/images/logo.png","alt","","width","150"],[1,"card-body"],[1,"pt-2","pb-2"],[1,"card-title","text-center","pb-0","fs-4"],[1,"text-center","small"],["autocomplete","off",1,"row","g-3","needs-validation",3,"formGroup","submit"],[1,"col-12"],["for","yourUsername",1,"form-label"],["type","email","formControlName","email","placeholder","Ingrese su email","id","yourUsername","required","",1,"form-control"],["class","form-text text-danger",4,"ngIf"],[1,"col-12",2,"position","relative"],["for","yourPassword",1,"form-label"],["formControlName","password","placeholder","Ingrese su contrase\xf1a","id","yourPassword","required","",1,"form-control",3,"type"],[1,"small","mb-0",2,"cursor","pointer",3,"click"],[1,"bi","bi-eye-fill","small","mb-0","text-center"],["type","submit",1,"btn","btn-primary","w-100",3,"disabled"],[1,"col-12","text-center","small"],[1,"small","mb-0","text-center"],["routerLink","/auth/registro",1,"small"],["href","#",1,"back-to-top","d-flex","align-items-center","justify-content-center"],[1,"bi","bi-arrow-up-short"],[1,"form-text","text-danger"]],template:function(r,n){1&r&&(e.TgZ(0,"html",0)(1,"head"),e._UZ(2,"meta",1)(3,"meta",2),e.TgZ(4,"title"),e._uU(5,"OcularVet - Login "),e.qZA(),e._UZ(6,"meta",3)(7,"meta",4)(8,"link",5)(9,"link",6)(10,"link",7)(11,"link",8),e.qZA(),e.TgZ(12,"body")(13,"main",9)(14,"div",10)(15,"section",11)(16,"div",10)(17,"div",12)(18,"div",13)(19,"div",14)(20,"div",15)(21,"div",16)(22,"div",17),e._UZ(23,"img",18),e.qZA()(),e.TgZ(24,"div",16),e._uU(25,"OcularVet"),e.qZA()(),e.TgZ(26,"div",19)(27,"div",20)(28,"h5",21),e._uU(29,"Login"),e.qZA(),e.TgZ(30,"p",22),e._uU(31,"Ingres\xe1 tu usuario y contrase\xf1a para ingresar"),e.qZA()(),e.TgZ(32,"form",23),e.NdJ("submit",function(){return n.login()}),e.TgZ(33,"div",24)(34,"label",25),e._uU(35,"Email"),e.qZA(),e._UZ(36,"input",26),e.YNc(37,h,2,0,"span",27),e.qZA(),e.TgZ(38,"div",28)(39,"label",29),e._uU(40,"Contrase\xf1a"),e.qZA(),e._UZ(41,"input",30),e.TgZ(42,"div",31),e.NdJ("click",function(){return n.mostrarOcultarPasswordFunction()}),e.TgZ(43,"i",32),e._uU(44," Mostrar/ocultar contrase\xf1a "),e.qZA()(),e.YNc(45,_,2,0,"span",27),e.qZA(),e.TgZ(46,"div",24)(47,"button",33),e._uU(48," Login "),e.qZA()(),e.TgZ(49,"div",34)(50,"p",35),e._uU(51,"No tenes usuario?"),e.qZA(),e.TgZ(52,"p")(53,"a",36),e._uU(54," Crea una cuenta nueva"),e.qZA()()()()()()()()()()()(),e.TgZ(55,"a",37),e._UZ(56,"i",38),e.qZA()()()),2&r&&(e.xp6(32),e.Q6J("formGroup",n.miFormulario),e.xp6(5),e.Q6J("ngIf",n.campoNoValido("email")),e.xp6(4),e.Q6J("type",n.mostrarOcultarPassword?"text":"password"),e.xp6(4),e.Q6J("ngIf",n.campoNoValido("password")),e.xp6(2),e.Q6J("disabled",n.miFormulario.invalid))},dependencies:[m.O5,l.yS,o._Y,o.Fj,o.JJ,o.JL,o.Q7,o.sg,o.u],encapsulation:2}),t})()},{path:"registro",component:(()=>{class t{constructor(r,n,a){this.fb=r,this.router=n,this.authservice=a,this.miFormularioRegistro=this.fb.group({name:["test 1",[o.kI.required]],surname:["apellidoTest 1",[o.kI.required]],DNI:["4231",[o.kI.required,o.kI.min(999)]],email:["test1@test.com",[o.kI.required,o.kI.email]],password:["123456",[o.kI.required,o.kI.minLength(6)]],rePassword:["123456",[o.kI.required]],codigoRegistro:["2022",[o.kI.required]]},{validators:[this.authservice.camposIguales("password","rePassword")]}),this.mostrarOcultarPassword=!1}registrar(){const{name:r,surname:n,DNI:a,email:I,password:d,rePassword:F,codigoRegistro:k}=this.miFormularioRegistro.value;d===F?this.authservice.registro(r,n,a,I,d,k).subscribe(g=>{!0===g?this.router.navigateByUrl("/ocularVet"):u().fire("Error al registrar usuario",g,"error")}):u().fire("Las dos contrase\xf1as no coinciden","Por favor ingrese la misma contrase\xf1a en los dos campos","error")}campoNoValido(r){return this.miFormularioRegistro.get(r)?.invalid&&this.miFormularioRegistro.get(r)?.touched}mostrarOcultarPasswordFunction(){console.log("holsss"),this.mostrarOcultarPassword=!this.mostrarOcultarPassword}}return t.\u0275fac=function(r){return new(r||t)(e.Y36(o.QS),e.Y36(l.F0),e.Y36(p.e))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-register"]],decls:84,vars:11,consts:[["lang","en"],["charset","utf-8"],["content","width=device-width, initial-scale=1.0","name","viewport"],["content","","name","description"],["content","","name","keywords"],["href","assets/img/favicon.png","rel","icon"],["href","assets/img/apple-touch-icon.png","rel","apple-touch-icon"],["href","https://fonts.gstatic.com","rel","preconnect"],["href","https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i","rel","stylesheet"],[1,"animate__animated","animate__backInLeft"],[1,"container"],[1,"section","register","min-vh-100","d-flex","flex-column","align-items-center","justify-content-center","py-4"],[1,"row","justify-content-center"],[1,"col-lg-4","col-md-6","d-flex","flex-column","align-items-center","justify-content-center"],[1,"card","mb-3"],[1,"card-header"],[1,"d-flex","justify-content-center"],["href","index.html",1,"logo","d-flex","align-items-center","w-auto"],["src","../../../../assets/images/logo.png","alt","","width","150"],[1,"d-lg-block"],[1,"card-body"],[1,"pt-4","pb-2"],[1,"card-title","text-center","pb-0","fs-4"],[1,"text-center","small"],["novalidate","","autocomplete","off",1,"row","g-3","needs-validation",3,"formGroup","ngSubmit"],[1,"col-12"],["for","name",1,"form-label"],["type","text","formControlName","name","id","name",1,"form-control"],["class","form-text text-danger",4,"ngIf"],["for","surname",1,"form-label"],["type","text","formControlName","surname","id","surname","required","",1,"form-control"],["for","DNI",1,"form-label"],["type","number","formControlName","DNI","id","DNI",1,"form-control"],["for","email",1,"form-label"],["type","email","formControlName","email","id","email",1,"form-control"],["for","password",1,"form-label"],["formControlName","password","id","password","required","",1,"form-control",3,"type"],[1,"small","mb-0",2,"cursor","pointer",3,"click"],[1,"bi","bi-eye-fill","small","mb-0","text-center"],["for","rePassword",1,"form-label"],["formControlName","rePassword","id","rePassword","required","",1,"form-control",3,"type"],["for","codigoRegistro",1,"form-label"],["type","number","formControlName","codigoRegistro","id","codigoRegistro","required","",1,"form-control"],["type","submit",1,"btn","btn-primary","w-100",3,"disabled"],[1,"col-12",2,"text-align","center"],[1,"small","mb-0"],["routerLink","/auth/login"],["href","#",1,"back-to-top","d-flex","align-items-center","justify-content-center"],[1,"bi","bi-arrow-up-short"],[1,"form-text","text-danger"]],template:function(r,n){1&r&&(e.TgZ(0,"html",0)(1,"head"),e._UZ(2,"meta",1)(3,"meta",2),e.TgZ(4,"title"),e._uU(5,"OcularVet - Registro"),e.qZA(),e._UZ(6,"meta",3)(7,"meta",4)(8,"link",5)(9,"link",6)(10,"link",7)(11,"link",8),e.qZA(),e.TgZ(12,"body")(13,"main",9)(14,"div",10)(15,"section",11)(16,"div",10)(17,"div",12)(18,"div",13)(19,"div",14)(20,"div",15)(21,"div",16)(22,"a",17),e._UZ(23,"img",18),e.TgZ(24,"span",19),e._uU(25,"OcularVet"),e.qZA()()()(),e.TgZ(26,"div",20)(27,"div",21)(28,"h5",22),e._uU(29,"Crea una cuenta"),e.qZA(),e.TgZ(30,"p",23),e._uU(31," Ingres\xe1 por favor tu informaci\xf3n personal"),e.qZA()(),e.TgZ(32,"form",24),e.NdJ("ngSubmit",function(){return n.registrar()}),e.TgZ(33,"div",25)(34,"label",26),e._uU(35,"Nombre:"),e.qZA(),e._UZ(36,"input",27),e.YNc(37,b,2,0,"span",28),e.qZA(),e.TgZ(38,"div",25)(39,"label",29),e._uU(40,"Apellido:"),e.qZA(),e._UZ(41,"input",30),e.YNc(42,T,2,0,"span",28),e.qZA(),e.TgZ(43,"div",25)(44,"label",31),e._uU(45,"DNI:"),e.qZA(),e._UZ(46,"input",32),e.YNc(47,A,2,0,"span",28),e.qZA(),e.TgZ(48,"div",25)(49,"label",33),e._uU(50,"Email:"),e.qZA(),e._UZ(51,"input",34),e.YNc(52,q,2,0,"span",28),e.qZA(),e.TgZ(53,"div",25)(54,"label",35),e._uU(55,"Contrase\xf1a:"),e.qZA(),e._UZ(56,"input",36),e.TgZ(57,"span",37),e.NdJ("click",function(){return n.mostrarOcultarPasswordFunction()}),e.TgZ(58,"i",38),e._uU(59," Mostrar/ocultar contrase\xf1as "),e.qZA()(),e.YNc(60,w,2,0,"span",28),e.qZA(),e.TgZ(61,"div",25)(62,"label",39),e._uU(63,"Repetir contrase\xf1a:"),e.qZA(),e._UZ(64,"input",40),e.TgZ(65,"span",37),e.NdJ("click",function(){return n.mostrarOcultarPasswordFunction()}),e.TgZ(66,"i",38),e._uU(67," Mostrar/ocultar contrase\xf1as "),e.qZA()(),e.YNc(68,y,2,0,"span",28),e.qZA(),e.TgZ(69,"div",25)(70,"label",41),e._uU(71,"C\xf3digo de registro: "),e.qZA(),e._UZ(72,"input",42),e.YNc(73,U,2,0,"span",28),e.qZA(),e.TgZ(74,"div",25)(75,"button",43),e._uU(76," Crea tu cuenta "),e.qZA()(),e.TgZ(77,"div",44)(78,"p",45),e._uU(79," Ya tienes una cuenta? "),e.TgZ(80,"a",46),e._uU(81," Ingresa aqui"),e.qZA()()()()()()()()()()()(),e.TgZ(82,"a",47),e._UZ(83,"i",48),e.qZA()()()),2&r&&(e.xp6(32),e.Q6J("formGroup",n.miFormularioRegistro),e.xp6(5),e.Q6J("ngIf",n.campoNoValido("name")),e.xp6(5),e.Q6J("ngIf",n.campoNoValido("surname")),e.xp6(5),e.Q6J("ngIf",n.campoNoValido("DNI")),e.xp6(5),e.Q6J("ngIf",n.campoNoValido("email")),e.xp6(4),e.Q6J("type",n.mostrarOcultarPassword?"text":"password"),e.xp6(4),e.Q6J("ngIf",n.campoNoValido("password")),e.xp6(4),e.Q6J("type",n.mostrarOcultarPassword?"text":"password"),e.xp6(4),e.Q6J("ngIf",n.campoNoValido("rePassword")),e.xp6(5),e.Q6J("ngIf",n.campoNoValido("codigoRegistro")),e.xp6(2),e.Q6J("disabled",n.miFormularioRegistro.invalid))},dependencies:[m.O5,l.yS,o._Y,o.Fj,o.wV,o.JJ,o.JL,o.Q7,o.sg,o.u],encapsulation:2}),t})()},{path:"**",redirectTo:"login"}]}];let C=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.Bz.forChild(N),l.Bz]}),t})(),x=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[m.ez,C,o.UX]}),t})()}}]);