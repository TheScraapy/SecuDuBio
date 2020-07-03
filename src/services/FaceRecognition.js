import KariosApi from '@/services/KariosApi'

export default {
  enroll (image, subjectId) {
    return KariosApi().post('enroll', {
      'image': image,
      'subject_id': subjectId,
      'gallery_name': 'MainGallery'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'app_id': process.env.VUE_APP_KAIROS_APP_ID,
        'app_key': process.env.VUE_APP_KAIROS_API_KEY
      }
    })
  },
  verify (image, subjectId) {
    return KariosApi().post('verify', {
      'image': image,
      'subject_id': subjectId,
      'gallery_name': 'MainGallery'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'app_id': process.env.VUE_APP_KAIROS_APP_ID,
        'app_key': process.env.VUE_APP_KAIROS_API_KEY
      }
    })
  }
}
