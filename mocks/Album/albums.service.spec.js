import { findAlbumById, findAlbumsByTitleAndAuthor } from './albums.service';


describe('albums.service tests', ()=>{

    test('should return specific album when search 2cecdfaa-d4ed-4a24-af1b-e04963d09c88 id in findAlbumById function ', ()=>{
        const contactId = '2cecdfaa-d4ed-4a24-af1b-e04963d09c88';
        
        const result = findAlbumById(contactId);

        const { contact: {firstName, lastName, phoneNumber, mail}, message} = result;
        expect(firstName).toBe('Jean');
        expect(lastName).toBe('Phil');
        expect(phoneNumber).toBe('0636656562');
        expect(mail).toBe('jPhil@es6exp.com');
        expect(message).toBe('');
    });

    test('should return error message when pass 1234 id in findAlbumById function ', ()=>{
        const contactId = '1234';
        
        const result = findAlbumById(contactId);

        const {contact, message} = result;
        expect(contact).toBe(undefined);
        expect(message).toBe(`Album with id property and value : ${contactId} not found`);
    });

    test('should return one album when pass  title equal LA PEST ET LE CHOLERA and author Tagada Jones in findAlbumsByTitleAndAuthor function ', ()=>{
        const title = 'LA PEST ET LE CHOLERA';
        const author = 'Tagada Jones';

        const result = findAlbumsByTitleAndAuthor(title, author);

        const { albums, message}= result;
        expect(albums.length).toBe(1);
        expect(message).toBe('');
    });

    test('should return error message when pass wrong title and author in findContactsByFirstAndLastName function ', ()=>{
        const title = 'test';
        const author = 'test2';

        const result = findAlbumsByTitleAndAuthor(title, author);

        const { contacts, message} = result;
        expect(contacts).toEqual([]);
        expect(message).toBe(`Album with title : ${title} and author : ${author} not found`);
    });
});
