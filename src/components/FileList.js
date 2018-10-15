import React from 'react';
import prettyFileIcons from 'pretty-file-icons';

// ----- urls -----
import { AMZ_S3_URL } from '../config'

// ----- css -----
import './FileList.css';

export default class FileList extends React.Component {
    render() {
        const { files } = this.props;

        let fileLinks = files? files.map((file, index) => { 
            const link = AMZ_S3_URL+file;
            const fileIcon = prettyFileIcons.getIcon(link, 'svg');
            return (
                <li key={index} className="attachment">
                    <a href={link} target="_blank"><img className="attachement-icon"  alt="attachment icon file type" src={AMZ_S3_URL+'icons/'+fileIcon}/></a>
                </li>
            )}) : undefined;

        return (
            <ul className="file-list">
                {fileLinks}
            </ul>
        )
    }
}