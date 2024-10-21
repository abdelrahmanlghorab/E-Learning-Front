import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://127.0.0.1:8000/api/';
  constructor(
    private http: HttpClient) { }
    getcourseRating(id:any){
      return this.http.get(this.apiUrl + `course/${id}/ratings`);
    }
    getteacherRating(id:any){
      return this.http.get(this.apiUrl + `teacher/${id}/ratings`);
    }
    setCourseRating(id:any,rating:any){
      const  ratingData = {
        "course_id": id,
        "rating": rating
      };
      return this.http.post(this.apiUrl + `course/${id}/rate`,ratingData);
    }
    setTeacherRating(id:any,rating:any){
      const  ratingData = {
        "teacher_id": id,
        "rating": rating
      };
      return this.http.post(this.apiUrl + `teacher/${id}/rate`,ratingData);
    }
    checkTeacherCourses(teacher_id:any,user_id:any){
      return this.http.get(this.apiUrl + `check-enrollment-teacher`,{params:{teacher_id:teacher_id,user_id:user_id}});
    }
}
