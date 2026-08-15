/* Design reminder: «اطمینان آبی در سه لایه» — روایت فروش‌محور مرجع، فضای روشن، سرمه‌ای #000838، ماکاپ‌های لایه‌ای و حرکت ظریف؛ بدون هدر و فوتر. */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  BarChart3,
  CheckCircle2,
  Code2,
  Gauge,
  Layers3,
  LockKeyhole,
  MessagesSquare,
  MoveUpLeft,
  PanelTop,
  PhoneCall,
  SearchCheck,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Waypoints,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

/* Design reminder: آبی و سرمه‌ای هویت اصلی هستند؛ زرد و نارنجی فقط برای تأکیدهای کوچک، مسیرهای کلیدی و تعامل‌ها استفاده می‌شوند. */
const assets = {
  hero: "/manus-storage/aseman-hero-layered-studio_39678e1d.png",
  integrations: "/manus-storage/aseman-integrations-orbit_6072153c.png",
  dashboard: "/manus-storage/aseman-management-dense_e81c7c59.png",
  growth: "/manus-storage/aseman-growth-services_24bfc6d5.png",
  symbol: "/manus-storage/aseman-symbol_16257107.png",
  partner: "/manus-storage/aseman-partner-current_822bd4f3.png",
  partnerFold: "/manus-storage/aseman-partner-fold_0571f743.png",
  processPortrait: "/manus-storage/aseman-process-portrait_8611f715.png",
  ctaGrowth: "/manus-storage/aseman-cta-growth_29994269.png",
};

const portfolioItems = [
  { title: "سفارش طراحی سایت در مشهد", type: "خدمات اختصاصی", description: "ساخت یک مسیر حرفه‌ای برای معرفی و رشد کسب‌وکار", image: "/manus-storage/aseman-service-order_f30a26e8.webp" },
  { title: "طراحی سایت فروشگاهی", type: "فروش آنلاین", description: "فروشگاه سریع، امن و آماده توسعه برای مشتریان شما", image: "/manus-storage/aseman-service-store_ef5634da.webp" },
  { title: "طراحی سایت حرفه‌ای", type: "برند و تجربه", description: "تجربه‌ای دقیق و متمایز برای مخاطبان برند شما", image: "/manus-storage/aseman-service-pro_e79be7bb.webp" },
  { title: "سایت شرکتی و صنعتی", type: "معرفی سازمان", description: "نمایش توانمندی‌ها، خدمات و مسیر ارتباط در یک قاب حرفه‌ای", image: "/manus-storage/aseman-service-company_2e015ce8.webp" },
];

const steps = [
  {
    number: "۱",
    title: "تحلیل نیازها و مشاوره",
    text: "اهداف، بازار هدف، امکانات مورد نیاز و مسیر درست پروژه را با هم مشخص می‌کنیم.",
  },
  {
    number: "۲",
    title: "طراحی مفهومی و رابط کاربری",
    text: "چیدمان، رنگ‌بندی و تجربه کاربری را برای برند و مخاطب شما طراحی می‌کنیم.",
  },
  {
    number: "۳",
    title: "کدنویسی، توسعه و تست",
    text: "سایت اختصاصی با تمرکز بر سرعت، امنیت و عملکرد پایدار توسعه و بررسی می‌شود.",
  },
  {
    number: "۴",
    title: "تحویل، آموزش و رشد",
    text: "پس از تأیید نهایی، آموزش مدیریت و پشتیبانی مورد نیاز شما ادامه پیدا می‌کند.",
  },
];

const benefits = [
  { icon: ShieldCheck, title: "امنیت قابل اتکا", text: "حفاظت از اطلاعات و پیاده‌سازی اصولی دسترسی‌ها از ابتدا در مسیر پروژه است." },
  { icon: Gauge, title: "سرعت و عملکرد", text: "کدنویسی و منابع سایت براساس نیاز واقعی کسب‌وکار شما بهینه می‌شوند." },
  { icon: Layers3, title: "طراحی اختصاصی", text: "ظاهر و امکانات سایت با برند، مخاطب و هدف واقعی کسب‌وکار شما هماهنگ است." },
  { icon: MessagesSquare, title: "پشتیبانی همراه", text: "پس از تحویل هم برای بهبود، تغییرات و توسعه در کنار شما می‌مانیم." },
];

const features = [
  { icon: PanelTop, title: "طراحی واکنش‌گرا", text: "نمایش دقیق در موبایل، تبلت و دسکتاپ" },
  { icon: SearchCheck, title: "سئو فنی", text: "ساختار قابل درک برای موتورهای جست‌وجو" },
  { icon: Gauge, title: "بارگذاری سریع", text: "کد سبک و بهینه برای تجربه روان‌تر" },
  { icon: LockKeyhole, title: "امنیت سایت", text: "لایه‌های دسترسی و محافظت مناسب" },
  { icon: Code2, title: "کدنویسی اختصاصی", text: "امکانات دقیقاً مطابق نیاز پروژه" },
  { icon: ServerCog, title: "مدیریت منابع", text: "مصرف بهینه سرور و دیتابیس" },
  { icon: Waypoints, title: "یکپارچه‌سازی", text: "اتصال به ابزارها و سرویس‌های مورد نیاز" },
  { icon: BarChart3, title: "گزارش‌گیری", text: "آمادگی برای تحلیل رفتار و رشد سایت" },
  { icon: MessagesSquare, title: "فرم‌های هدفمند", text: "مسیر ساده‌تر برای تماس و دریافت درخواست" },
  { icon: PanelTop, title: "پنل مدیریت", text: "ویرایش و به‌روزرسانی بخش‌های قابل مدیریت" },
  { icon: Sparkles, title: "رابط کاربری حرفه‌ای", text: "ساختار روشن و تجربه کاربری قابل فهم" },
  { icon: Zap, title: "توسعه‌پذیری", text: "امکان افزودن قابلیت‌های تازه در آینده" },
];

const guideSections = [
  {
    title: "مقدمه",
    content: "تصور کنید کسب‌وکار شما یک فروشگاه در بهترین نقطه مشهد دارد، اما هیچ تابلویی ندارد و مشتریان نمی‌توانند آن را پیدا کنند. امروزه بسیاری از کسب‌وکارهایی که حاضر به داشتن وب‌سایت نیستند، با شرایط مشابه مواجه‌اند. یک وب‌سایت حرفه‌ای دقیقاً همان تابلویی است که حضور آنلاین شما را به دیگران معرفی می‌کند. در دنیای دیجیتال، داشتن یک سایت اختصاصی و استاندارد نه‌تنها اعتبار برند شما را افزایش می‌دهد، بلکه مشتریان جدیدی را نیز جذب می‌کند. گروه نرم‌افزاری آسمان با سال‌ها تجربه در طراحی سایت در مشهد، راهکاری متفاوت برای کسب‌وکارهای کوچک و بزرگ ارائه می‌دهد. این تیم با طراحی خلاقانه، بهینه‌سازی برای موتورهای جست‌وجو و رعایت اصول تجربه کاربری، وب‌سایتی ایجاد می‌کند که هم زیباست و هم کاربردی. پشتیبانی قوی، امنیت بالا و واکنش‌گرایی کامل، از دیگر مزایای همکاری با این مجموعه است.",
  },
  {
    title: "تعرفه طراحی سایت در مشهد",
    content: "تعرفه‌های طراحی سایت اختصاصی در مشهد به عوامل مختلفی بستگی دارد و نمی‌توان یک قیمت ثابت برای همه پروژه‌ها در نظر گرفت. هزینه طراحی سایت به نوع وب‌سایت، امکانات مورد نیاز مانند درگاه پرداخت، پنل مدیریت و چت آنلاین، میزان سفارشی‌سازی، طراحی گرافیکی اختصاصی و بهینه‌سازی برای موتورهای جست‌وجو بستگی دارد. قیمت طراحی اختصاصی ممکن است نسبت به استفاده از قالب‌های آماده بیشتر باشد؛ اما به دلیل بازدهی بالای سایت‌های اختصاصی، این هزینه در مدت زمان کوتاهی می‌تواند به سوددهی کسب‌وکار کمک کند. گروه نرم‌افزاری آسمان قیمت‌های منصفانه و متناسب با نیاز مشتریان ارائه می‌دهد.",
  },
  {
    title: "آشنایی با انواع سایت‌ها",
    content: "وب‌سایت‌ها با اهداف و کاربردهای متفاوتی طراحی می‌شوند. وب‌سایت فروشگاهی برای فروش آنلاین محصولات و امکاناتی مانند سبد خرید، درگاه پرداخت و جست‌وجوی پیشرفته است. وب‌سایت شرکتی برای معرفی برند، خدمات و محصولات یک کسب‌وکار طراحی می‌شود. سایت معرفی نمونه‌کار برای نمایش رزومه و پروژه‌های افراد حرفه‌ای مناسب است. سایت بلاگی به انتشار مقاله، ویدیو و تصویر می‌پردازد. سایت خبری و مجله‌ای بر انتشار اخبار و رویدادهای روز تمرکز دارد و سایت آموزشی برای ارائه دوره‌ها یا معرفی مؤسسات آموزشی استفاده می‌شود. انتخاب نوع مناسب سایت تأثیر زیادی بر موفقیت آنلاین شما خواهد داشت.",
  },
  {
    title: "چرا طراحی سایت با کدنویسی؟",
    content: "برای طراحی سایت دو روش کلی پیش روی شما قرار دارد: استفاده از قالب‌های آماده و طراحی اختصاصی با کدنویسی. قالب‌های آماده سریع و ارزان هستند، اما در سفارشی‌سازی، امنیت و بهینه‌سازی محدودیت دارند. در مقابل، طراحی اختصاصی با کدنویسی دقیقاً مطابق با نیاز شما ساخته می‌شود و از ابتدا برای سرعت بالا، امنیت بیشتر و سئو طراحی می‌شود. چنین سایتی انعطاف‌پذیری بیشتری دارد، قابلیت‌های تازه را در آینده می‌پذیرد و تجربه کاربری آن براساس نیاز مخاطبان هدف برنامه‌ریزی می‌شود.",
  },
  {
    title: "سفارشی‌سازی کامل",
    content: "هر کسب‌وکاری نیازهای خاص خود را دارد و یک وب‌سایت عمومی همیشه پاسخگوی این نیازها نیست. با طراحی سایت اختصاصی می‌توان طراحی گرافیکی، پنل مدیریتی، فیلترهای جست‌وجوی سفارشی، سیستم‌های پرداخت خاص و تعاملات ویژه با کاربران را دقیقاً مطابق با نیاز کسب‌وکار پیاده‌سازی کرد. این سطح از سفارشی‌سازی تجربه کاربری و بهره‌وری را بهتر می‌کند و به متمایز شدن از رقبا کمک می‌رساند.",
  },
  {
    title: "بهینه‌سازی عملکرد و امنیت بالا",
    content: "عملکرد سریع و روان یک وب‌سایت، نقش مستقیمی در تجربه کاربری و رضایت مشتریان دارد. در طراحی اختصاصی فقط کدهای ضروری استفاده می‌شوند و بهینه‌سازی دیتابیس و مدیریت درخواست‌ها با دقت بیشتری انجام می‌شود. از سوی دیگر، امنیت برای کسب‌وکارهایی که با اطلاعات مشتریان سروکار دارند ضروری است. استفاده از پروتکل‌های امنیتی قوی، مدیریت دسترسی، رمزگذاری داده‌ها، فایروال و گواهی SSL در طراحی اختصاصی امکان‌پذیر است و به کاهش آسیب‌پذیری‌های رایج کمک می‌کند.",
  },
  {
    title: "انعطاف‌پذیری، فناوری و پشتیبانی فنی",
    content: "یک وب‌سایت موفق باید همراه با رشد کسب‌وکار توسعه یابد. سایت اختصاصی اجازه می‌دهد امکانات و ویژگی‌های جدید بدون محدودیت اضافه شوند. امکان سازگاری با فرآیندهای کاری خاص، اتصال به نرم‌افزارهای سازمانی و استفاده از فناوری‌های جدید نیز فراهم است. مدیریت بهینه منابع، کاهش هزینه‌های نگهداری و دسترسی به پشتیبانی فنی متناسب با کدهای سایت از دیگر مزیت‌های این رویکرد است.",
  },
  {
    title: "نمونه کارها و پروژه‌های قبلی",
    content: "انتخاب یک تیم حرفه‌ای برای طراحی سایت، بدون بررسی نمونه‌کارهای قبلی دشوار است. تیم طراحی سایت در مشهد با تجربه در حوزه‌های آموزشی، خودرویی، فروشگاهی، پزشکی و صنعتی، پروژه‌های متنوعی را اجرا کرده است. هدف ما ایجاد سایت‌هایی است که علاوه بر زیبایی بصری، عملکردی قدرتمند و تجربه کاربری ایده‌آل ارائه دهند. در بخش نمونه‌کارها می‌توانید کیفیت طراحی و امکانات پروژه‌ها را بررسی کنید.",
  },
  {
    title: "چرا گروه نرم‌افزاری آسمان؟",
    content: "گروه نرم‌افزاری آسمان با تمرکز بر طراحی اختصاصی، امنیت بالا، عملکرد سریع و تجربه کاربری بهینه، سایت‌هایی متناسب با نیازهای مشتریان ارائه می‌دهد. تیمی متخصص در برنامه‌نویسی، طراحی UI/UX، سئو، تولید محتوا و امنیت وب، استفاده از فناوری‌های جدید، قیمت‌های رقابتی و پشتیبانی تخصصی را در کنار هم قرار می‌دهد تا وب‌سایت شما استاندارد، متمایز و قابل رشد باشد.",
  },
  {
    title: "مراحل و نحوه همکاری با ما",
    content: "طراحی یک وب‌سایت حرفه‌ای نیازمند برنامه‌ریزی دقیق و اجرای مرحله‌به‌مرحله است. فرایند همکاری شامل تحلیل نیازها و مشاوره، طراحی مفهومی و رابط کاربری، کدنویسی و توسعه، تست و عیب‌یابی، بازبینی و تأیید نهایی و تحویل رسمی به کارفرما است. در هر مرحله، شما با تیم در ارتباط خواهید بود تا سایت دقیقاً مطابق با انتظاراتتان پیاده‌سازی شود. پس از تحویل نیز آموزش مدیریت سایت و پشتیبانی فنی ارائه می‌شود.",
  },
  {
    title: "ویژگی‌های یک سایت حرفه‌ای و موفق در مشهد",
    content: "یک سایت موفق ترکیبی از زیبایی، عملکرد و تجربه کاربری عالی است. طراحی واکنش‌گرا، سئو و بهینه‌سازی برای گوگل، امنیت و سرعت بارگذاری، و تجربه کاربری ساده و روان از مهم‌ترین ویژگی‌های یک وب‌سایت حرفه‌ای هستند. چنین سایتی هم برای موتورهای جست‌وجو قابل درک است و هم به کاربر کمک می‌کند با کمترین سردرگمی به هدف خود برسد.",
  },
  {
    title: "طراحی سایت در مشهد برای چه کسب‌وکارهایی مناسب است؟",
    content: "هر جایی که مشتری هست، اینترنت هم حضور دارد. فروشگاه‌های اینترنتی، شرکت‌ها و کارخانه‌ها، پزشکان و کلینیک‌ها، مراکز خدماتی، آموزشگاه‌ها و مؤسسات آموزشی می‌توانند با یک سایت حرفه‌ای اعتبار خود را افزایش دهند و خدمات یا محصولاتشان را بدون محدودیت زمان و مکان معرفی کنند. سایت فروشگاهی به درگاه پرداخت امن و طراحی کاربرپسند نیاز دارد؛ سایت شرکتی به معرفی دقیق خدمات و رزومه؛ سایت پزشکی به دسترسی آسان به خدمات و وقت‌دهی؛ و سایت آموزشی به ساختاری منظم برای دوره‌ها و ثبت‌نام.",
  },
];

const faqItems = [
  {
    question: "هزینه طراحی سایت در مشهد چقدر است؟",
    answer: "هزینه طراحی سایت بسته به نوع وب‌سایت، امکانات مورد نیاز و میزان سفارشی‌سازی متفاوت است و معمولاً از چند میلیون تومان شروع می‌شود.",
  },
  { question: "مدت زمان طراحی سایت چقدر طول می‌کشد؟", answer: "زمان اجرا با توجه به دامنه پروژه، تعداد صفحه‌ها و امکانات مورد نیاز تعیین می‌شود. پس از جلسه تحلیل نیاز و مشخص شدن جزئیات، زمان‌بندی مرحله‌ای و شفاف پروژه را ارائه می‌کنیم تا مسیر طراحی، توسعه، تست و تحویل قابل پیگیری باشد." },
  { question: "آیا وب‌سایت‌ها بهینه‌سازی شده برای سئو تحویل داده می‌شوند؟", answer: "بله. ساختار فنی سایت با توجه به اصول پایه سئو، سرعت بارگذاری، نمایش درست در موبایل، ساختار عنوان‌ها و امکان توسعه محتوایی طراحی می‌شود. برنامه سئو و تولید محتوای مداوم می‌تواند پس از راه‌اندازی، به‌صورت جداگانه ادامه پیدا کند." },
  { question: "بعد از طراحی سایت، پشتیبانی هم ارائه می‌دهید؟", answer: "بله. پس از تحویل، آموزش مدیریت بخش‌های قابل ویرایش و پشتیبانی فنی مورد نیاز ارائه می‌شود. برای تغییرات، بهبود عملکرد، توسعه قابلیت‌های تازه و نگهداری دوره‌ای نیز می‌توانید روی همراهی تیم آسمان حساب کنید." },
  { question: "آیا امکان افزودن امکانات جدید به سایت در آینده وجود دارد؟", answer: "بله. ساختار سایت اختصاصی به‌گونه‌ای طراحی می‌شود که همراه با رشد کسب‌وکار توسعه پیدا کند. اتصال به درگاه پرداخت، سامانه پیامک، CRM، گزارش‌گیری، فرم‌های جدید یا هر قابلیت متناسب با فرایند کاری شما در آینده قابل برنامه‌ریزی و اجراست." },
];

const detailedLegacySections = [
  {
    title: "چرا به سایت نیاز داریم؟",
    content: "امروزه، حضور آنلاین برای هر کسب‌وکاری امری حیاتی است. وب‌سایت شما نه تنها کارت ویزیت دیجیتال است، بلکه فرصتی طلایی برای معرفی برند و خدمات شما به هزاران نفر است. با داشتن یک سایت حرفه‌ای، می‌توانید ارتباط خود را با مشتریان تقویت کرده و فروش خود را به طور چشمگیری افزایش دهید. یک وب‌سایت مناسب، شما را همیشه در دسترس می‌سازد و حتی در ساعات غیرکاری هم می‌توانید به راحتی محصولات و خدمات خود را به فروش برسانید. به‌ویژه در مشهد، جایی که رقابت در دنیای آنلاین شدیدتر از همیشه است، طراحی سایت در مشهد می‌تواند عامل تمایز شما از رقبا باشد. چه قصد راه‌اندازی یک طراحی سایت فروشگاهی در مشهد را داشته باشید، چه یک وب‌سایت شرکتی، داشتن یک سایت حرفه‌ای و کاربرپسند می‌تواند شما را به هدف‌تان نزدیک‌تر کند و مشتریان جدیدی جذب کنید. گروه نرم‌افزاری آسمان با تجربه‌ای چندین ساله، به شما کمک می‌کند تا در دنیای دیجیتال یک قدم جلوتر باشید."
  },
  {
    title: "چرا طراحی سایت اختصاصی بهتر است؟",
    content: "در دنیای امروز، داشتن یک سایت اختصاصی به شما این امکان را می‌دهد که یک وب‌سایت کاملاً منحصر به فرد و مطابق با نیازهای کسب‌وکار خود داشته باشید. برخلاف قالب‌های آماده که ممکن است محدودیت‌هایی در عملکرد و طراحی داشته باشند، سایت اختصاصی به شما اجازه می‌دهد تا ویژگی‌هایی دقیقاً متناسب با برند و اهداف خود ایجاد کنید. این نوع طراحی نه تنها به شما کنترل کامل بر ظاهر و عملکرد سایت می‌دهد، بلکه از نظر سئو و عملکرد نیز بهینه‌تر خواهد بود. به علاوه، یک سایت اختصاصی به شما این امکان را می‌دهد که در صورت نیاز، امکانات جدید را به راحتی اضافه کنید و سایت خود را گسترش دهید. سرمایه‌گذاری در یک سایت حرفه‌ای و منحصر به فرد به شما کمک می‌کند تا در درازمدت بازگشت سرمایه بیشتری داشته باشید و تجربه کاربری بهتری برای مشتریان ایجاد کنید."
  },
  {
    title: "چرا گروه نرم‌افزاری آسمان را انتخاب کنیم؟",
    content: "انتخاب یک تیم متخصص برای طراحی سایت می‌تواند تفاوت زیادی در موفقیت آنلاین شما ایجاد کند. گروه نرم‌افزاری آسمان با تجربه چندین ساله در طراحی وب‌سایت‌های حرفه‌ای و متناسب با نیازهای کسب‌وکارها، برای کسانی است که می‌خواهند حضوری مؤثر و موفق در فضای دیجیتال داشته باشند. هدف ما این است که در کنار ارائه طراحی‌های مدرن و خلاقانه، سایتی کارآمد، سئو‌محور و سریع به شما تحویل دهیم. پشتیبانی حرفه‌ای، مشاوره‌های مفید و به‌روزرسانی‌های مداوم، از ایده‌پردازی تا اجرای کامل، در کنار شماست تا بهترین وب‌سایت را با توجه به نیازهای خاص کسب‌وکارتان ایجاد کنیم."
  },
  {
    title: "مزیت‌های آسمان در یک نگاه",
    content: "تیمی متخصص و باتجربه، طراحی سفارشی و منحصر‌به‌فرد، سرعت بارگذاری بالا، تجربه کاربری بهبود یافته، تضمین امنیت، استفاده از جدیدترین فناوری‌ها و قیمت رقابتی و ارزش بالا از مهم‌ترین نقاط قوت گروه نرم‌افزاری آسمان هستند. اعضای تیم در برنامه‌نویسی، طراحی UI/UX، سئو، تولید محتوای متنی و امنیت وب تخصص دارند. ساختار منظم، دسترسی آسان، ناوبری ساده و طراحی واکنش‌گرا در پروژه‌ها رعایت می‌شود تا کاربران بدون سردرگمی از سایت استفاده کنند."
  },
  {
    title: "سازگاری با نیازهای خاص کسب‌وکار",
    content: "هر کسب‌وکار نیازهای منحصربه‌فردی دارد که در قالب‌های آماده به‌درستی پوشش داده نمی‌شوند. طراحی سایت اختصاصی این امکان را می‌دهد که امکانات و ویژگی‌های سایت کاملاً مطابق با اهداف و فرآیندهای کاری شما پیاده‌سازی شوند. از قابلیت‌های خاص مانند پنل مدیریت سفارشی، سیستم‌های اتوماسیون داخلی، درگاه‌های پرداخت متنوع و تعاملات خاص با کاربران گرفته تا یکپارچه‌سازی با سایر نرم‌افزارهای سازمانی، همه این موارد در طراحی اختصاصی قابل اجرا هستند."
  },
  {
    title: "استفاده از تکنولوژی‌های جدید و مدیریت بهتر منابع",
    content: "با پیشرفت روزافزون فناوری، استفاده از تکنولوژی‌های جدید در طراحی سایت اهمیت زیادی دارد. طراحی سایت به صورت اختصاصی این امکان را فراهم می‌کند که از جدیدترین زبان‌های برنامه‌نویسی، فریمورک‌ها و ابزارهای بهینه‌سازی عملکرد استفاده شود. تکنولوژی‌هایی مانند هوش مصنوعی، پردازش ابری و Progressive Web Apps در سایت‌های اختصاصی راحت‌تر قابل استفاده هستند. در طراحی اختصاصی، منابع سرور و دیتابیس نیز بهینه‌تر مدیریت می‌شوند؛ فقط امکانات مورد نیاز کسب‌وکار ساخته می‌شوند، مصرف منابع کاهش می‌یابد و سایت می‌تواند ترافیک بالاتر را بدون افت کیفیت مدیریت کند."
  },
  {
    title: "فرایند اجرا: تحلیل نیازها و طراحی مفهومی",
    content: "اولین قدم در طراحی سایت، شناخت دقیق نیازهای کسب‌وکار و اهداف شماست. تیم گروه نرم‌افزاری آسمان با برگزاری جلسات مشاوره و بررسی دقیق انتظارات شما، تحلیل جامعی از نیازهای پروژه انجام می‌دهد. پس از مشخص شدن نیازها، مرحله طراحی رابط کاربری و تجربه کاربری آغاز می‌شود. چیدمان صفحات، انتخاب رنگ‌بندی، طراحی دکمه‌ها، تصاویر و عناصر بصری بررسی می‌شوند تا تجربه‌ای جذاب، کاربرپسند و استاندارد ایجاد شود و شما بتوانید نظرات و پیشنهادهای خود را پیش از توسعه نهایی اعمال کنید."
  },
  {
    title: "فرایند اجرا: کدنویسی، تست و تحویل",
    content: "پس از تأیید طراحی رابط کاربری، نوبت به کدنویسی و توسعه وب‌سایت می‌رسد. فرانت‌اند، بک‌اند، سیستم مدیریت محتوا، فرم‌های تماس، درگاه پرداخت و امکانات مورد نیاز در این مرحله توسعه می‌یابند. پس از آن تمامی بخش‌ها از نظر لینک‌ها، فرم‌ها، واکنش‌گرایی در دستگاه‌های مختلف، امنیت و سازگاری با مرورگرها تست و عیب‌یابی می‌شوند. پس از بازبینی نهایی و دریافت تأیید کارفرما، سایت روی هاست اصلی بارگذاری، دامنه متصل و آموزش مدیریت ارائه می‌شود. پشتیبانی فنی و مشاوره پس از تحویل نیز ادامه خواهد داشت."
  },
  {
    title: "ویژگی‌های یک سایت حرفه‌ای و موفق",
    content: "طراحی واکنش‌گرا، سئو و بهینه‌سازی برای گوگل، امنیت و سرعت بارگذاری و تجربه کاربری عالی از ویژگی‌های اصلی یک سایت حرفه‌ای هستند. سایت باید روی موبایل، تبلت و دسکتاپ بدون به‌هم‌ریختگی نمایش داده شود. با بهینه‌سازی محتوا، سرعت و ساختار سایت، امکان دیده‌شدن در نتایج جست‌وجو بیشتر می‌شود. سایت امن و سریع، کاربران را حفظ می‌کند و طراحی ساده و روان کمک می‌کند بازدیدکننده به‌راحتی به هدف خود برسد و دوباره به سایت بازگردد."
  },
  {
    title: "فروشگاه‌های اینترنتی در مشهد",
    content: "بازار آنلاین مشهد هر روز داغ‌تر می‌شود. بسیاری از فروشگاه‌ها با طراحی سایت فروشگاهی در مشهد توانسته‌اند فروش خود را چند برابر کنند و مشتریانشان را از سطح شهر فراتر ببرند. سایت فروشگاهی حرفه‌ای باید سرعت بالا، درگاه پرداخت امن و طراحی کاربرپسند داشته باشد تا تجربه خریدی راحت فراهم کند. با داشتن یک سایت فروشگاهی حرفه‌ای، کسب‌وکار شما همیشه در دسترس مشتریان قرار دارد و محدودیت‌های زمانی و مکانی را از بین می‌برد."
  },
  {
    title: "شرکت‌ها، کارخانه‌ها، پزشکان و مراکز خدماتی",
    content: "مجموعه‌های صنعتی می‌توانند محصولات، خدمات و توانمندی‌های خود را به مشتریان داخلی و خارجی معرفی کنند و با یک سایت شرکتی رسمی، سریع و دارای بخش‌های دقیق درباره معرفی شرکت، رزومه و اطلاعات تماس اعتبار بسازند. پزشکان و کلینیک‌ها نیز می‌توانند رزومه خود را نمایش دهند، وقت‌دهی آنلاین ارائه کنند و با بیماران در ارتباط باشند. یک سایت بهینه از نظر سئو و امنیت، پلی میان تخصص و نیاز مخاطب است و دسترسی سریع به اطلاعات و خدمات مورد نیاز را فراهم می‌کند."
  },
  {
    title: "آموزشگاه‌ها و مؤسسات آموزشی در مشهد",
    content: "دنیای آموزش دیگر فقط در کلاس‌ها خلاصه نمی‌شود. آموزشگاه‌ها می‌توانند دوره‌ها، اساتید و خدمات آموزشی خود را به‌صورت آنلاین معرفی کنند و حتی ثبت‌نام اینترنتی داشته باشند. یک سایت آموزشی خوب باید محیطی منظم، ساده و سریع داشته باشد تا دانشجو یا هنرجو به راحتی اطلاعات مورد نیازش را پیدا کند. با یک سایت حرفه‌ای، آموزشگاه‌ها جایگاه خود را میان رقبا تثبیت می‌کنند و مخاطبان تازه‌ای از سراسر کشور جذب خواهند کرد."
  },
];

const allGuideSections = [...guideSections, ...detailedLegacySections].map((section, index) => ({ ...section, index }));

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.56, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionIntro({ eyebrow, title, text, centered = false }: { eyebrow?: string; title: string; text?: string; centered?: boolean }) {
  return (
    <div className={centered ? "section-intro section-intro-center" : "section-intro"}>
      {eyebrow && <p className="eyebrow"><span />{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export default function Home() {
  const [activeGuideIndex, setActiveGuideIndex] = useState(0);
  const shellRef = useRef<HTMLElement>(null);
  const animationFrame = useRef<number | null>(null);
  const currentPointer = useRef({ x: 0, y: 0 });
  const targetPointer = useRef({ x: 0, y: 0 });
  const activeGuide = allGuideSections[activeGuideIndex];

  const animateParallax = () => {
    const next = currentPointer.current;
    const target = targetPointer.current;
    next.x += (target.x - next.x) * 0.075;
    next.y += (target.y - next.y) * 0.075;
    shellRef.current?.style.setProperty("--px", `${next.x.toFixed(2)}px`);
    shellRef.current?.style.setProperty("--py", `${next.y.toFixed(2)}px`);
    if (Math.abs(target.x - next.x) > 0.03 || Math.abs(target.y - next.y) > 0.03) {
      animationFrame.current = requestAnimationFrame(animateParallax);
    } else {
      animationFrame.current = null;
    }
  };

  const queueParallax = () => {
    if (animationFrame.current === null) animationFrame.current = requestAnimationFrame(animateParallax);
  };

  const handleParallax = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    targetPointer.current = { x: ((event.clientX - rect.left) / rect.width - .5) * 12, y: ((event.clientY - rect.top) / rect.height - .5) * 10 };
    queueParallax();
  };

  const resetParallax = () => {
    targetPointer.current = { x: 0, y: 0 };
    queueParallax();
  };

  useEffect(() => () => {
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
  }, []);

  return (
    <main ref={shellRef} dir="rtl" className="site-shell">
      <section className="hero-section" aria-labelledby="hero-title" onMouseMove={handleParallax} onMouseLeave={resetParallax}>
        <div className="hero-grain" />
        <div className="hero-ring hero-ring-one" />
        <div className="hero-ring hero-ring-two" />
        <div className="vector-field" aria-hidden="true">
          <i className="vector-line vector-line-a" /><i className="vector-line vector-line-b" /><i className="vector-line vector-line-c" />
          <b className="vector-node node-a" /><b className="vector-node node-b" /><b className="vector-node node-c" /><b className="vector-node node-d" />
        </div>
        <div className="hero-content page-container">
          <Reveal className="hero-copy">
            <div className="service-chip"><Sparkles size={16} /> طراحی سایت اختصاصی در مشهد</div>
            <h1 id="hero-title">سایتی که با رشد کسب‌وکار<br />شما <em>توسعه</em> پیدا می‌کند.</h1>
            <p>تخصص ما طراحی سایت در مشهد با تمرکز بر کیفیت، امنیت، سرعت و ظاهر حرفه‌ای است. هدفمان کمک به رشد و دیده‌شدن کسب‌وکارها در فضای آنلاین است.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#consultation">مشاوره رایگان <ArrowLeft size={18} /></a>
              <a className="button button-secondary" href="#portfolio">مشاهده نمونه‌کارها <MoveUpLeft size={18} /></a>
            </div>
            <div className="trust-row" aria-label="ویژگی‌های کلیدی">
              <span><CheckCircle2 size={17} /> طراحی اختصاصی</span>
              <span><CheckCircle2 size={17} /> امنیت و سرعت</span>
              <span><CheckCircle2 size={17} /> پشتیبانی همراه</span>
            </div>
          </Reveal>
          <Reveal className="hero-art parallax-hero">
            <div className="hero-art-backdrop" />
            <div className="hero-vector-layer vector-layer-back" aria-hidden="true" />
            <div className="hero-vector-layer vector-layer-middle" aria-hidden="true" />
            <div className="hero-vector-layer vector-layer-front" aria-hidden="true" />
            <div className="hero-ui-layer" aria-hidden="true"><span className="hero-ui-dot" /><span className="hero-ui-line hero-ui-line-wide" /><span className="hero-ui-line" /><div className="hero-ui-cards"><i /><i /><i /></div></div>
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            <img src={assets.hero} alt="تصویرسازی سه‌بعدی طراحی سایت حرفه‌ای" />
            <div className="floating-note note-top"><span className="note-icon"><Zap size={16} /></span><div><strong>عملکرد سریع</strong><small>کدنویسی بهینه</small></div></div>
            <div className="floating-note note-bottom"><span className="note-icon"><ShieldCheck size={16} /></span><div><strong>امنیت پایدار</strong><small>ساختار استاندارد</small></div></div>
          </Reveal>
        </div>
      </section>

      <section className="partners-section" aria-labelledby="partners-title">
        <Reveal className="page-container partners-inner">
          <SectionIntro eyebrow="اعتبار و همکاری" title="همراهان ما" centered />
          <div className="partners-cascade"><div className="partner-logo-frame partner-row-one"><img src={assets.partner} alt="ردیف اول همراهان گروه نرم‌افزاری آسمان" /></div><div className="partner-logo-frame partner-row-fold"><img src={assets.partnerFold} alt="ردیف دوم و سوم همراهان گروه نرم‌افزاری آسمان" /></div></div>
        </Reveal>
      </section>

      <section className="connection-section section-space">
        <Reveal className="page-container split-layout">
          <div className="split-copy">
            <SectionIntro eyebrow="آماده برای اتصال" title="سایتی که با ابزارهای کسب‌وکار شما هماهنگ است." text="ساخت سایت حرفه‌ای، اولین قدم برای راه‌اندازی یک سیستم فروش و ارتباط پایدار است. بر اساس نیاز پروژه، سایت می‌تواند به فرم‌های درخواست، پیامک، درگاه پرداخت، ابزارهای مدیریت مشتری، تحلیل داده و سایر سرویس‌های مورد نیاز متصل شود." />
            <a className="text-link" href="#consultation">برای پروژه‌تان مشاوره بگیرید <ArrowLeft size={18} /></a>
            <div className="integration-pills"><span>درگاه پرداخت</span><span>پیامک</span><span>CRM</span><span>تحلیل</span></div>
          </div>
          <div className="media-panel media-panel-orbit parallax-panel"><img src={assets.integrations} alt="تصویرسازی اتصال سایت به ابزارهای کسب‌وکار" /></div>
        </Reveal>
      </section>

      <section className="steps-section section-space" id="process">
        <Reveal className="page-container">
          <SectionIntro centered eyebrow="مسیر روشن همکاری" title="مراحل طراحی سایت با آسمان" text="طراحی یک وب‌سایت حرفه‌ای نیازمند برنامه‌ریزی دقیق و اجرای مرحله‌به‌مرحله است. از مشاوره اولیه تا تحویل نهایی، در جریان مسیر پروژه خواهید بود." />
          <div className="process-stage">
            <div className="process-column process-column-right">
              {[steps[0], steps[2]].map((step, index) => <motion.article className="process-step process-stage-step" key={step.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.45 }}><span className="step-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></motion.article>)}
            </div>
            <motion.div className="process-video-card" initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .5 }}><img src={assets.processPortrait} alt="تصویرسازی فرایند طراحی و توسعه سایت" /><span className="process-video-shine" /><span className="process-video-caption">از ایده تا تحویل</span></motion.div>
            <div className="process-column process-column-left">
              {[steps[1], steps[3]].map((step, index) => <motion.article className="process-step process-stage-step" key={step.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index + 2) * 0.08, duration: 0.45 }}><span className="step-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></motion.article>)}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="benefits-section section-space">
        <Reveal className="page-container">
          <div className="benefit-grid">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return <motion.article className="benefit-card" key={benefit.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07, duration: 0.45 }}><div className="benefit-icon"><Icon size={25} /></div><h3>{benefit.title}</h3><p>{benefit.text}</p></motion.article>;
            })}
          </div>
        </Reveal>
      </section>

      <section className="management-section section-space">
        <Reveal className="page-container split-layout split-reverse">
          <div className="media-panel dashboard-panel dashboard-panel-dense parallax-panel"><img src={assets.dashboard} alt="ماکاپ متراکم پنل مدیریت سایت" /></div>
          <div className="split-copy">
            <SectionIntro eyebrow="مدیریت بی‌دردسر" title="مدیریت سایتتان باید ساده باشد، نه وابسته." text="برای راه‌اندازی و مدیریت وب‌سایت، نباید درگیر پیچیدگی‌های فنی شوید. پنل مدیریت مناسب به شما امکان می‌دهد محتوا، بخش‌های قابل ویرایش، فرم‌ها و اطلاعات ضروری سایت را متناسب با نیاز پروژه به‌روزرسانی کنید." />
            <a className="button button-primary button-small" href="#features">امکانات سایت حرفه‌ای <ArrowLeft size={17} /></a>
          </div>
        </Reveal>
      </section>

      <section className="features-section section-space" id="features">
        <Reveal className="page-container">
          <SectionIntro centered eyebrow="امکانات قابل توسعه" title="امکانات یک سایت اختصاصی حرفه‌ای" text="سایت اختصاصی از ابتدا برای رشد کسب‌وکار شما ساخته می‌شود؛ بنابراین هر بخش با هدف مشخص و قابلیت توسعه در آینده طراحی خواهد شد." />
          <div className="feature-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return <motion.article className="feature-card" key={feature.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 4) * 0.05, duration: 0.4 }}><Icon size={22} /><div><h3>{feature.title}</h3><p>{feature.text}</p></div></motion.article>;
            })}
          </div>
        </Reveal>
      </section>

      <section className="blue-banner section-space" id="consultation">
        <Reveal className="page-container banner-content">
          <div className="banner-copy"><p className="eyebrow eyebrow-light"><span /> آماده شروع یک مسیر حرفه‌ای؟</p><h2>ایده کسب‌وکارتان را به یک سایت حرفه‌ای تبدیل کنیم.</h2><p>برای اطلاعات بیشتر درباره پکیج‌های طراحی سایت در مشهد مناسب شما، با ما در ارتباط باشید.</p><a className="button button-white" href="#contact">مشاوره رایگان <ArrowLeft size={18} /></a></div>
          <div className="banner-visual"><img src={assets.ctaGrowth} alt="تصویرسازی رشد و توسعه سایت" /></div>
        </Reveal>
      </section>

      <section className="portfolio-section section-space" id="portfolio">
        <Reveal className="page-container">
          <SectionIntro eyebrow="پروژه‌هایی با هدف واقعی" title="نمونه‌کارهای طراحی سایت آسمان" text="هر پروژه فرصتی است تا با دقت و خلاقیت، سایتی منحصربه‌فرد برای یک کسب‌وکار بسازیم؛ سایتی که علاوه بر ظاهر حرفه‌ای، عملکرد و تجربه کاربری مناسبی هم داشته باشد." />
          <div className="portfolio-rail">
            {portfolioItems.map((item, index) => <motion.article className={`portfolio-card parallax-card portfolio-card-${index + 1}`} key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08, duration: .48 }}><div className="portfolio-browser"><span /><span /><span /></div><div className="portfolio-art"><img src={item.image} alt={item.title} /><div className="portfolio-sheen" /></div><div className="portfolio-info"><p>{item.type}</p><h3>{item.title}</h3><span>{item.description}</span><a className="portfolio-link" href="#consultation" aria-label={`مشاهده نمونه‌های ${item.title}`}><span>مشاهده</span><ArrowUpLeft size={16} /></a></div></motion.article>)}
          </div>
          <a className="button button-secondary portfolio-cta" href="#consultation">مشاهده نمونه‌کارهای بیشتر <ArrowLeft size={18} /></a>
        </Reveal>
      </section>

      <section className="support-section section-space">
        <Reveal className="page-container split-layout">
          <div className="split-copy">
            <SectionIntro eyebrow="همراه در تمام مسیر" title="از ایده تا رشد آنلاین، کنار شما هستیم." text="در گروه نرم‌افزاری آسمان، طراحی سایت فقط شروع مسیر است. از تحلیل نیاز و طراحی رابط کاربری تا توسعه، تست، آموزش مدیریت و پشتیبانی فنی، همکاری طوری پیش می‌رود که وب‌سایت شما همواره سریع، امن و قابل بهبود باقی بماند." />
            <div className="support-checks"><span><CheckCircle2 size={19} /> تیمی متخصص و باتجربه</span><span><CheckCircle2 size={19} /> جدیدترین فناوری‌های وب</span><span><CheckCircle2 size={19} /> قیمت شفاف و متناسب با نیاز</span></div>
          </div>
          <div className="media-panel support-media parallax-panel"><img src={assets.growth} alt="تصویرسازی خدمات و پشتیبانی مستمر" /></div>
        </Reveal>
      </section>

      <section className="custom-section section-space">
        <Reveal className="page-container">
          <SectionIntro centered eyebrow="چرا طراحی اختصاصی؟" title="چرا طراحی سایت اختصاصی انتخاب بهتری است؟" text="در مقابل قالب‌های آماده، یک سایت اختصاصی به شما کنترل بیشتر بر ظاهر، عملکرد، سئو و مسیر توسعه آینده می‌دهد." />
          <div className="custom-grid">
            <article><span>۰۱</span><h3>سفارشی‌سازی کامل</h3><p>از طراحی گرافیکی منحصربه‌فرد تا امکانات فنی و فرآیندهای کاری خاص، همه‌چیز متناسب با نیاز واقعی کسب‌وکار شما پیاده‌سازی می‌شود.</p></article>
            <article><span>۰۲</span><h3>عملکرد، سرعت و امنیت</h3><p>استفاده از کدهای ضروری، بهینه‌سازی منابع و توجه به لایه‌های امنیتی، سایت را برای تجربه‌ای سریع‌تر و پایدارتر آماده می‌کند.</p></article>
            <article><span>۰۳</span><h3>مقیاس‌پذیری در آینده</h3><p>با رشد کسب‌وکار، امکانات جدید، اتصال به سرویس‌ها و تغییرات اساسی بدون محدودیت قالب‌های آماده به سایت اضافه می‌شوند.</p></article>
          </div>
        </Reveal>
      </section>

      <section className="guide-section section-space" id="guide">
        <div className="garden-orb orb-guide-one" aria-hidden="true" /><div className="garden-orb orb-guide-two" aria-hidden="true" />
        <Reveal className="page-container guide-layout">
          <div className="guide-sticky guide-heading-center"><div className="question-orb"><span>؟</span><i /><i /><i /></div><p className="eyebrow"><span /> راهنمای کامل آسمان</p><h2>هر سؤال، شروع یک مسیر روشن است.</h2><p>تمامی نکات مهمی که باید درباره طراحی سایت در مشهد بدانید، از تعرفه و انواع سایت تا فناوری، فرایند همکاری و کسب‌وکارهای مناسب.</p><div className="guide-note"><Sparkles size={18} /><span>یکی از عنوان‌ها را باز کنید و پاسخ متناسب با مسیر کسب‌وکارتان را بخوانید.</span></div><a className="text-link text-link-light" href="#consultation">برای انتخاب مسیر درست، مشاوره بگیرید <ArrowLeft size={18} /></a></div>
          <div className="knowledge-stack"><div className="stack-label"><span>نقشه دانستنی‌ها</span><b>۲۴ پاسخ کاربردی</b></div><div className="guide-explorer"><div className="guide-topic-grid">{allGuideSections.map((section) => <button type="button" className={section.index === activeGuideIndex ? "guide-topic is-active" : "guide-topic"} onClick={() => setActiveGuideIndex(section.index)} key={section.title}><span>{String(section.index + 1).padStart(2, "0")}</span>{section.title}</button>)}</div><article className="guide-detail"><div className="guide-detail-label"><span>موضوع انتخاب‌شده</span><b>{String(activeGuide.index + 1).padStart(2, "0")}</b></div><h3>{activeGuide.title}</h3><p>{activeGuide.content}</p></article></div></div>
        </Reveal>
      </section>

      <section className="faq-section section-space" id="faq">
        <div className="faq-light-beam" aria-hidden="true" />
        <Reveal className="page-container faq-layout">
          <div className="faq-intro"><div className="faq-mark"><span>؟</span><i /><i /></div><p className="eyebrow"><span /> پاسخ به تردیدها</p><h2>سوالات متداول</h2><p>سوالاتی که ممکن است برای شما پیش‌آید</p><div className="faq-side-caption"><span>یک پرسش خوب،</span><strong>شروع یک تصمیم بهتر است.</strong></div></div>
          <div className="faq-card-wrap"><div className="faq-card-top"><span>پرسش‌های شما</span><div><i /><i /><i /></div></div><div className="faq-native-list">{faqItems.map((item, index) => <details className="faq-native-item" open={index === 0} key={item.question}><summary><span className="faq-index">{String(index + 1).padStart(2, "0")}</span><span>{item.question}</span><b>+</b></summary><div className="faq-native-answer"><p>{item.answer}</p></div></details>)}</div></div>
        </Reveal>
      </section>

      <a className="support-float" href="tel:09120209130" aria-label="تماس با پشتیبانی گروه نرم‌افزاری آسمان" data-tooltip="پشتیبانی و تماس — ۰۹۱۲۰۲۰۹۱۳۰"><span className="support-float-icon"><PhoneCall size={22} /></span><span className="support-float-copy"><strong>پشتیبانی و تماس</strong><small>۰۹۱۲۰۲۰۹۱۳۰</small></span></a>

    </main>
  );
}
