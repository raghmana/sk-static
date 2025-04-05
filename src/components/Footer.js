import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/home.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.brand}>
          <p className={styles.bInner}><Image src="/asset/logo-round.png" alt="Sindhu's Kitchen" width={100} height={100} priority /><label>Whether you&apos;re craving crispy bites or savory treats, we&apos;ve got you covered. Come enjoy a taste of India and treat yourself to snacks that hit the spot!</label></p>
          <hr />
          <h4>Location</h4>
          <p>2700 E Eldorado Pkwy Suite, <br />#203, Little Elm, Texas - 75068</p>
          <Link href="https://www.google.com/maps/place/SINDHU'S/@33.1763166,-96.8900071,59m/data=!3m1!1e3!4m15!1m8!3m7!1s0x864c39971559bb43:0x70c6cc347c8cc8bd!2s2700+E+Eldorado+Pkwy+Suite+203,+Little+Elm,+TX+75068,+USA!3b1!8m2!3d33.1763805!4d-96.8901107!16s%2Fg%2F11rnfbd97j!3m5!1s0x864c390076ba6f27:0x20fa1bdd09c7b3c8!8m2!3d33.1763805!4d-96.8901107!16s%2Fg%2F11vr27stpd?entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoASAFQAw%3D%3D" className={styles.btn} target={'_blank'}><Image src="/asset/icon/location.png" alt="Sindhu's Kitchen" width={11} height={16} priority /> Find Us on Map</Link>
        </div>
        <div class={styles.hours}>
          <h4>Opening Hours</h4>
          <p><label className={styles.label}>Sunday: </label><label>11:00 AM to 9:00 PM</label></p>
          <p><label className={styles.label}>Monday: </label><label>11:00 AM to 9:00 PM</label></p>
          <p><label className={styles.label}>Tuesday: </label><label>CLOSED</label></p>
          <p><label className={styles.label}>Wednesday: </label><label>11:00 AM to 9:00 PM</label></p>
          <p><label className={styles.label}>Thursday: </label><label>11:00 AM to 9:00 PM</label></p>
          <p><label className={styles.label}>Friday: </label><label>11:00 AM to 9:00 PM</label></p>
          <p><label className={styles.label}>Saturday: </label><label>11:00 AM to 9:00 PM</label></p>
        </div>
        <div class={styles.navLinks}>
          <h4>Navigation</h4>
          <Link href="/aboutus" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <Link href="/menu" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          <Link href="/catering" onClick={() => setIsMenuOpen(false)}>Catering</Link>
          <Link href="/snacks" onClick={() => setIsMenuOpen(false)}>Snacks</Link>
        </div>
       
        <div className={styles.contact}>
          <h4>General Enquiries</h4>
          <Link href="mailto:sindhuskitchenusa@gmail.com" onClick={() => setIsMenuOpen(false)}><Image src="/asset/icon/email.png" alt="Sindhu's Kitchen" width={15} height={15} priority /> sindhuskitchenusa@gmail.com</Link>
          <Link href="tel:+1940-279-2536" onClick={() => setIsMenuOpen(false)}><Image src="/asset/icon/phone.png" alt="Sindhu's Kitchen" width={13} height={13} priority /> +1 940-279-2536</Link>
          <Link href="https://api.whatsapp.com/send/?phone=19402792536&text&type=phone_number&app_absent=0" className={styles.btn}><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="WhatsAppIcon"><path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z" fill='#fff'></path></svg> Whatsapp</Link>
        </div>
      </div>
      <hr className={styles.seperator} />
      <p className={styles.copy}>&copy; 2025 Sindhu’s Kitchen, LLC 2025 All Rights Reserved</p>
    </footer>
  );
}