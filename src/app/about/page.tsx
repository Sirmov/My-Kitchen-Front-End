import Link from 'next/link';

import { FacebookFilled, InstagramFilled, LinkedinFilled, MailFilled } from '@ant-design/icons';

import logo from '@public/logo.png';
import profilePic from '@public/profile.jpg';

import ImageWithFallback from '@utils/imageWithFallback/imageWithFallback';

import styles from './page.module.scss';

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <div className={styles.about}>
                <ImageWithFallback src={logo} alt="logo" className={styles.logo} />
                <h1>About This Project</h1>
                <p>
                    This app is a free and open source recipe management platform designed to help home cooks and
                    families stay organized in the kitchen. You can collect your favorite recipes, track your
                    ingredients, plan meals, and more — all while keeping full control over your data.
                </p>

                <h2>Features</h2>
                <h3>🍲 Recipe keeping</h3>
                <p>Save, edit and organize your favorite recipes using categories and tags.</p>

                <h3>📦 Pantry stock</h3>
                <p>Keep track of ingredients you have at home.</p>

                <h3>🛒 Shopping list</h3>
                <p>Generate shopping list from recipes and pantry ingredients.</p>

                <h3>🔍 Smart Search</h3>
                <p>Find recipes using ingredients you have on hand.</p>

                <h3>📅 Mealplan</h3>
                <p>Plan your meals for the week or month ahead.</p>

                <h3>🔃 Import Export Backup Sync</h3>
                <p>Sync your data or migrate between devices with ease. Set a schedule for automatic backup.</p>

                <h2>Why I Built This</h2>
                <p>
                    I built this Next.js web app as the frontend for a{' '}
                    <Link href="https://github.com/Sirmov/My-Kitchen-Back-End">
                        microservice-based backend developed with Kubernetes and ASP.NET Core
                    </Link>
                    . Designed to consume that API, the app offers a practical tool for managing recipes and planning
                    meals. It&apos;s also serving as my final project for a university web design course.
                </p>

                <h2>About Me</h2>
                <div className={styles.author}>
                    <p>
                        Hi! I’m Nikola Sirmov, a developer passionate about free and open-source projects and useful
                        tools that make everyday life easier. If you want to chat I&apos;m happy to connect. <br />
                        <Link href="mailto:sirmov0213@gmail.com" id={styles.mailIcon} className={styles.socialLink}>
                            <MailFilled />
                        </Link>{' '}
                        <Link
                            href="https://www.instagram.com/sirmov04"
                            id={styles.instagramIcon}
                            className={styles.socialLink}>
                            <InstagramFilled />
                        </Link>{' '}
                        <Link
                            href="https://www.facebook.com/profile.php?id=100000683407598"
                            id={styles.facebookIcon}
                            className={styles.socialLink}>
                            <FacebookFilled />
                        </Link>{' '}
                        <Link
                            href="https://www.linkedin.com/in/sirmov/"
                            id={styles.linkedinIcon}
                            className={styles.socialLink}>
                            <LinkedinFilled />
                        </Link>
                    </p>
                    <ImageWithFallback
                        src={profilePic}
                        alt="Author"
                        width={150}
                        height={150}
                        className={styles.profilePic}
                    />
                </div>
            </div>
        </div>
    );
}
