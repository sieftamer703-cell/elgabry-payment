'use strict';
const PAYMENT = Object.freeze({
  instapay: 'https://ipn.eg/S/diaa.6666/instapay/3F0bVP',
  instapayId: 'diaa.6666@instapay',
  vodafone: '01002517912',
  whatsapp: '201012993309'
});
const $ = id => document.getElementById(id);
let toastTimer;
function notify(message){ const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3000); }
async function copyText(value){
  try { if(!navigator.clipboard?.writeText) throw Error('Clipboard unavailable');await navigator.clipboard.writeText(value);notify('تم النسخ بنجاح ✓');return true; }
  catch { const field=document.createElement('textarea');field.value=value;field.setAttribute('readonly','');field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();let ok=false;try{ok=document.execCommand('copy')}catch{}field.remove();notify(ok?'تم النسخ بنجاح ✓':'تعذر النسخ تلقائيًا. انسخ البيانات يدويًا.');return ok; }
}
function normalizedAmount(){return $('amount').value.trim().replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-0x660)).replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-0x6f0)).replace(/،/g,'.').replace(/,/g,'.');}
function amountValue(){const s=normalizedAmount();if(!s)return '';const n=Number(s);if(!/^\d+(?:\.\d{1,2})?$/.test(s)||!Number.isFinite(n)||n<=0||n>100000000){$('amountError').hidden=false;$('amountError').textContent='من فضلك أدخل مبلغًا صحيحًا أكبر من صفر، بحد أقصى منزلتين عشريتين.';return null;}$('amountError').hidden=true;return n.toLocaleString('ar-EG',{maximumFractionDigits:2})+' جنيه';}
function updateReceipt(){const amount=amountValue();const message=['أهلًا مكتبة الجبري،','أرغب في تأكيد تحويل الدفع.',amount===null||!amount?'':`المبلغ: ${amount}`,'وسيلة الدفع: [InstaPay / Vodafone Cash]','سأرفق إيصال التحويل هنا.'].filter(Boolean).join('\n');$('receiptButton').href=`https://wa.me/${PAYMENT.whatsapp}?text=${encodeURIComponent(message)}`;}
$('amount').addEventListener('input',updateReceipt);
$('instapayButton').href=PAYMENT.instapay;
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',()=>copyText(button.dataset.copy)));
$('vodafoneButton').addEventListener('click',()=>copyText(PAYMENT.vodafone));
$('receiptButton').addEventListener('click',event=>{if(amountValue()===null){event.preventDefault();$('amount').focus();return;}updateReceipt();});
$('shareButton').addEventListener('click',async()=>{const data={title:'مكتبة الجبري | الدفع الإلكتروني',text:'صفحة الدفع الإلكتروني لمكتبة الجبري',url:location.href};if(navigator.share){try{await navigator.share(data)}catch(error){if(error.name!=='AbortError')await copyText(location.href)}}else await copyText(location.href)});
const theme=$('themeToggle');function applyTheme(dark){document.documentElement.classList.toggle('dark',dark);theme.textContent=dark?'☀️':'🌙';theme.setAttribute('aria-label',dark?'تفعيل الوضع النهاري':'تفعيل الوضع الليلي');theme.setAttribute('aria-pressed',String(dark));document.querySelector('meta[name="theme-color"]').content=dark?'#171a1c':'#eee9e1';}
let saved;try{saved=localStorage.getItem('elgabry-theme')}catch{}applyTheme(saved==='dark'||(!saved&&window.matchMedia?.('(prefers-color-scheme: dark)').matches));theme.addEventListener('click',()=>{const dark=!document.documentElement.classList.contains('dark');applyTheme(dark);try{localStorage.setItem('elgabry-theme',dark?'dark':'light')}catch{}});
$('year').textContent=new Date().getFullYear();updateReceipt();
