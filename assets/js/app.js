var i18n = new VueI18n({
    locale: navigator.language, // set locale
    messages, // set locale messages
});

var app = new Vue({
    i18n,
    el: '#contentVue',

    data: {
        selectedLanguage: navigator.language,
        languages: [
            'pt-BR', 'en-US'
        ],
        languageIco: '',
        dynamicModal: {
            modalHeader: '',
            modalBody: '',
        },
        showHorus: false,
        showConsultancy: false,
        showAnalytics: false,
        HorusHeader: '<h4 class="service-title">Hórus++</h4><p>Hórus++ é um sistema de análise preditiva de cibersegurança baseado em fontes abertas de informações na internet </p>',
        BlockChainContent: '<p>A tecnologia blockchain é um novo marco na história da tecnologia, assim como o surgimento da Internet, além de prover maior segurança e confiabilidade dos sistemas.</p><h5>Metodologia para adoção da tecnologia</h5><p>A CyberSecurity++ desenvolveu uma metodologia própria para análise e adequação de negócios para adoção da tecnologia Blockchain. Através da aplicação da metodologia desenvolvida, nossa equipe guiará a adoção da tecnologia de maneira consistente.</p><img style="max-width: 30%" alt="Blockchain" src="assets/images/old/block.png"><h5>Serviços oferecidos:</h5><table class="table"> <tbody> <tr class="table-secondary"> <th><i class="fa fa-check"></i> Esclarecimentos sobre a tecnologia e sua aplicabilidade no modelo de negócios da organização cliente.</th> </tr><tr> <th><i class="fa fa-check"></i> Análise e levantamento de requisitos, casos de uso para o modelo de negócio da organização cliente e parceiros.</th> </tr><tr class="table-secondary"> <th><i class="fa fa-check"></i> Implementação da solução utilizando a correta solução de Blockchain para o modelo de negócios alvo.</th> </tr></tbody></table>',
        BlockchainHeader: '<h4 class="service-title">Blockchain para empresas</h4><p>Hórus++ é um sistema de análise preditiva de cibersegurança baseado em fontes abertas de informações na internet </p>',
        AnalyticsCotent: '',
        AnalyticsHeader: '<h4 class="service-title">Análise de riscos cibernéticos</h4>',
        ConsultancyContent: '',
        ConsultancyHeader: '<h4 class="service-title">Consultoria em segurança cibernética</h4>'
    },

    mounted: function () {
        this.defineLanguage();
    },

    methods: {
        closeAllServices: function() {
            this.showAnalytics = false;
            this.showConsultancy = false;
            this.showHorus = false;
        },

        loadDynamicModal: function (modalType) {
            switch (modalType) {
                case 'horus':
                    this.closeAllServices();
                    this.showHorus = true;
                    break;

                case 'blockchain':
                    //this.dynamicModal.modalHeader = this.BlockchainHeader;
                    //this.dynamicModal.modalBody = this.BlockChainContent;
                    break;

                case 'analytics':
                    this.closeAllServices();
                    this.showAnalytics = true;
                    break;

                case 'consultancy':
                    this.closeAllServices();
                    this.showConsultancy = true;
                    break;
            }

            $('#modalDynamic').modal();
        },

        changeLanguage: function (language) {
            i18n.locale = language;
            this.selectedLanguage = language;
            this.defineLanguage();
        },

        defineLanguage: function () {
            var lang = this.selectedLanguage;

            switch (lang) {
                case 'pt-BR':
                    this.languageIco = 'https://cdn2.iconfinder.com/data/icons/flags-20/100/Brazil_flag-512.png';
                    break;

                case 'en-US':
                    this.languageIco = 'https://cdn2.iconfinder.com/data/icons/flags-20/100/Usa_flag-512.png';
                    break;

                default:
                    this.languageIco = 'https://cdn2.iconfinder.com/data/icons/flags-20/100/Brazil_flag-512.png';
                    break;
            }

            if (!this.languages.includes(this.selectedLanguage)) {
                this.selectedLanguage = 'en-US';
                i18n.locale = 'en-US';
                this.languageIco = 'https://cdn2.iconfinder.com/data/icons/flags-20/100/Usa_flag-512.png';
            }
        },

        validateEmailContact: function () {
            var form = {
                Nome: $("#nome").val(),
                Email: $("#email").val(),
                Telefone: $("#telefone").val(),
                Empresa: $("#empresa").val(),
                Mensagem: $("#mensagem").val()
            };

            var data = [];

            if (form.Nome.length < 1) {
                data.push({
                    field: "Nome"
                });
            }

            if (validateEmail(form.Email) < 1) {
                data.push({
                    field: "Email"
                });
            }

            if (form.Telefone.length < 1) {
                data.push({
                    field: "Telefone"
                });
            }

            if (form.Empresa.length < 1) {
                data.push({
                    field: "Empresa"
                });
            }

            if (form.Mensagem.length < 1) {
                data.push({
                    field: "Mensagem"
                });
            }

            return data;
        },

        sendForm: function () {
            var formData = {
                Nome: $("#nome").val(),
                Email: $("#email").val(),
                Telefone: $("#telefone").val(),
                Empresa: $("#empresa").val(),
                Mensagem: $("#mensagem").val()
            };

            var form = $("#contactForm");

            var data = this.validateEmailContact();
            console.log(data.length);

            if (data.length == 0) {
                $.ajax({
                    url: baseUrl + "cyber/core/sendmail.php",
                    type: "POST",
                    data: "nome=" + formData.Nome + "&email=" + formData.Email + "&mensagem=" + formData.Mensagem + "&empresa=" + formData.Empresa + "&telefone=" + formData.Telefone,
                    success: function (r) {
                        if (r.Success) {
                            toastr["success"](r.Message);
                            form[0].reset();
                        } else {
                            toastr["error"](r.Message)
                        }
                    },
                    error: function (e) {
                        toastr["error"](e)
                    }
                });
            } else {
                throwGroupExceptions(data);
            }
        }


    },

});