import { ILink } from '@/interfaces/link.interface';
import { linkService } from '@/service/addService';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './mainScreen.module.scss';

const MainScreen = () => {
	const [url, setUrl] = useState<string>('');
	const { pathname, query, asPath } = useRouter();

	const handler = async (link: string) => {
		console.log(pathname, query, asPath);

		const data = await linkService.addNew(link);
		setUrl(`http://localhost:3000/${data.id.toString()}`);
	};

	return (
		<div className={styles.main_box}>
			<div className='container'>
				<div className={styles.main_form}>
					<h1>Кароче</h1>
					<span className={styles.main_form__span}>
						Ставишь сюда ссылку и нажимешь на кнопку, ничего сложного!
					</span>
					<div className={styles.input_link}>
						<input
							type='text'
							placeholder='URL'
							value={url}
							onChange={(e) => setUrl(e.target.value)}
						/>
						<button onClick={() => handler(url)}>Кароче</button>
					</div>
					<span>Появится укороченная ссылка и qr-код</span>
				</div>
			</div>
		</div>
	);
};

export default MainScreen;
