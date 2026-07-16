console.log("📦 تم تحميل ملف main.js بنجاح");

document.addEventListener("DOMContentLoaded", () => {
  // ✅ قائمة التنقل (الهامبرغر)
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("nav-links");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll("#nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // ✅ سلايدر الصفحة الرئيسية
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (slides.length && dots.length && prevBtn && nextBtn) {
    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        dots[i].classList.toggle("active", i === index);
      });
      currentIndex = index;
    }

    nextBtn.addEventListener("click", () => {
      showSlide((currentIndex + 1) % slides.length);
    });

    prevBtn.addEventListener("click", () => {
      showSlide((currentIndex - 1 + slides.length) % slides.length);
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.getAttribute("data-slide"));
        showSlide(index);
      });
    });

    setInterval(() => {
      showSlide((currentIndex + 1) % slides.length);
    }, 5000);
  }

  // ✅ التبديل بين نماذج الدخول والتسجيل
  const loginContainer = document.querySelector(".login-container");
  const signupContainer = document.querySelector(".signup-container");
  const toggleToSignup = document.querySelector("#toggleSignup");
  const toggleToLogin = document.querySelector("#toggleLogin");

  if (toggleToSignup && loginContainer && signupContainer) {
    toggleToSignup.addEventListener("click", (e) => {
      e.preventDefault();
      loginContainer.style.display = "none";
      signupContainer.style.display = "block";
    });
  }

  if (toggleToLogin && loginContainer && signupContainer) {
    toggleToLogin.addEventListener("click", (e) => {
      e.preventDefault();
      signupContainer.style.display = "none";
      loginContainer.style.display = "block";
    });
  }

  // ✅ تسجيل الدخول
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const errorMessage = document.getElementById("errorMessage");
      const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{2,}$/;

      if (!nameRegex.test(username) || password.length < 4) {
        errorMessage.textContent = "❌ تأكد من إدخال اسم المستخدم وكلمة المرور بشكل صحيح";
        errorMessage.style.display = "block";
        return;
      }

      errorMessage.style.display = "none";
      localStorage.setItem("userName", username);
      window.location.href = "booking.html";
    });
  }

  // ✅ تسجيل حساب جديد
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullname = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const password = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const errorDiv = document.getElementById("signupError");

      const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{2,}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^7[013672]\d{7}$/;
      const passwordStrongRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

      if (!fullname || !email || !phone || !password || !confirmPassword) {
        return showSignupError("❌ جميع الحقول مطلوبة.");
      }

      if (!nameRegex.test(fullname)) {
        return showSignupError("❌ الاسم يجب أن يحتوي على أحرف فقط (بدون أرقام أو رموز).");
      }

      if (!emailRegex.test(email)) {
        return showSignupError("❌ البريد الإلكتروني غير صالح.");
      }

      if (!phoneRegex.test(phone)) {
        return showSignupError("❌ رقم الهاتف اليمني غير صحيح.");
      }

      if (!passwordStrongRegex.test(password)) {
        return showSignupError("❌ كلمة المرور يجب أن تحتوي على حرف كبير، رقم ورمز، وألا تقل عن 6 أحرف.");
      }

      if (password !== confirmPassword) {
        return showSignupError("❌ كلمتا المرور غير متطابقتين.");
      }

      errorDiv.style.display = "none";

      // ✅ حفظ المستخدمين
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.some((user) => user.email === email)) {
        return showSignupError("❌ هذا البريد الإلكتروني مستخدم مسبقًا.");
      }

      users.push({ fullname, email, phone, password });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("userName", fullname);

      alert("🎉 تم إنشاء الحساب بنجاح!");
      window.location.href = "./booking.html";

      function showSignupError(msg) {
        errorDiv.textContent = msg;
        errorDiv.style.display = "block";
      }
    });
  }

  // ✅ صفحة الحجز - عرض الاسم
  const welcomeText = document.getElementById("welcomeText");
  if (welcomeText) {
    const username = localStorage.getItem("userName");
    if (username) {
      welcomeText.textContent = "أهلاً بك، " + username + " 👋";
    }
  }

  // ✅ تعبئة التاريخ والوقت تلقائيًا
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");

  if (dateInput && timeInput) {
    const now = new Date();
    dateInput.value = now.toISOString().split("T")[0];
    timeInput.value = now.toTimeString().slice(0, 5);
  }

  // ✅ نموذج الحجز
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name");
      const phone = document.getElementById("phone");
      const date = document.getElementById("date");
      const time = document.getElementById("time");
      const people = document.getElementById("people");

      const nameError = document.getElementById("nameError");
      const phoneError = document.getElementById("phoneError");
      const dateError = document.getElementById("dateError");
      const timeError = document.getElementById("timeError");
      const peopleError = document.getElementById("peopleError");

      [nameError, phoneError, dateError, timeError, peopleError].forEach((el) => {
        if (el) el.style.display = "none";
      });

      let isValid = true;
      const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{2,}$/;
      const phoneRegex = /^7[013672]\d{7}$/;
      const todayStr = new Date().toISOString().split("T")[0];

      if (!nameRegex.test(name.value.trim())) {
        nameError.textContent = "يرجى إدخال اسم صحيح بالحروف فقط (بدون أرقام)";
        nameError.style.display = "block";
        isValid = false;
      }

      if (!phoneRegex.test(phone.value.trim())) {
        phoneError.textContent = "يرجى إدخال رقم جوال يمني صحيح (9 أرقام ويبدأ بـ 7)";
        phoneError.style.display = "block";
        isValid = false;
      }

      if (!date.value || date.value < todayStr) {
        dateError.textContent = "لا يمكن الحجز في تاريخ مضى";
        dateError.style.display = "block";
        isValid = false;
      }

      if (!time.value) {
        timeError.textContent = "يرجى اختيار وقت الحجز";
        timeError.style.display = "block";
        isValid = false;
      }

      if (!people.value) {
        peopleError.textContent = "يرجى تحديد عدد الأشخاص";
        peopleError.style.display = "block";
        isValid = false;
      }

      if (!isValid) return;

      const successMessage = document.getElementById("successMessage");
      successMessage.style.display = "block";

      setTimeout(() => {
        successMessage.style.display = "none";
        bookingForm.reset();
        const now = new Date();
        date.value = now.toISOString().split("T")[0];
        time.value = now.toTimeString().slice(0, 5);
      }, 5000);
    });
  }
});

// ✅ تسجيل الخروج
function logout() {
  localStorage.clear();
  window.location.href = "./index.html";
}
