import Html exposing (..)
import Html.App as Html
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)


main =
  Html.beginnerProgram { model = model, view = view, update = update }


-- MODEL

type alias Model =
  { name : String
  , password : String
  , passwordAgain : String
  , message : String
  }


model : Model
model =
  Model "" "" "" ""


-- UPDATE

type Msg
    = Name String
    | Password String
    | PasswordAgain String
    | Submit


update : Msg -> Model -> Model
update action model =
  case action of
    Name name ->
      { model | name = name }

    Password password ->
      { model | password = password }

    PasswordAgain password ->
      { model | passwordAgain = password }

    Submit ->
      viewValidation model
    -- VIEW

view : Model -> Html Msg
view model =
  div []
    [ input [ type' "text", placeholder "Name", onInput Name ] []
    , input [ type' "password", placeholder "Password", onInput Password ] []
    , input [ type' "password", placeholder "Re-enter Password", onInput PasswordAgain ] []
    , div [] [ text model.message]
    , button [ onClick Submit ] [ text "sumbit" ]
    ]

viewValidation : Model -> Model
viewValidation model =
  let
    (myresult) =
      if model.password == model.passwordAgain then
        "OK"
      else
       "Passwords do not match!"
  in
    {model | message = myresult}